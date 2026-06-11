import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { GitlabSummary, HeatmapDay, ProjectCard, RecentPush } from "./types";

/**
 * Data modes
 * ----------
 * api    — portfolio server calls company GitLab directly (GitLab must be
 *          reachable from where this app is deployed, e.g. Vercel).
 * static — reads data/gitlab-summary.json, produced by scripts/sync-stats.mjs
 *          running INSIDE company GitLab CI (works behind VPN/firewall).
 * demo   — no config yet; renders fake data so the page is previewable.
 */
const MODE = process.env.GITLAB_DATA_MODE ?? "auto";
const BASE = process.env.GITLAB_BASE_URL?.replace(/\/$/, "");
const TOKEN = process.env.GITLAB_TOKEN; // scope: read_api — NEVER expose to client
const USERNAME = process.env.GITLAB_USERNAME;

/** Comma-separated list of project paths allowed to appear with real names. */
const ALLOWLIST = new Set(
  (process.env.GITLAB_PUBLIC_PROJECTS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
);

const MAX_EVENT_PAGES = 40; // 40 × 100 events ≈ a heavy year of pushing

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------
export async function getGitlabSummary(): Promise<GitlabSummary> {
  if (MODE === "static") return (await readStatic()) ?? demoSummary();
  if (MODE === "api") return fetchFromApi();
  // auto: prefer live API, fall back to synced file, then demo
  if (BASE && TOKEN && USERNAME) {
    try {
      return await fetchFromApi();
    } catch (err) {
      console.error("[gitlab] live fetch failed, trying static file:", err);
    }
  }
  return (await readStatic()) ?? demoSummary();
}

// ---------------------------------------------------------------------------
// Mode: static (Plan B — GitLab behind firewall)
// ---------------------------------------------------------------------------
async function readStatic(): Promise<GitlabSummary | null> {
  try {
    const file = path.join(process.cwd(), "data", "gitlab-summary.json");
    const raw = await fs.readFile(file, "utf8");
    return { ...(JSON.parse(raw) as GitlabSummary), source: "static" };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Mode: api (Plan A — GitLab reachable from the deployment)
// ---------------------------------------------------------------------------
async function gl<T>(endpoint: string): Promise<{ data: T; nextPage: string | null }> {
  const res = await fetch(`${BASE}/api/v4${endpoint}`, {
    headers: { "PRIVATE-TOKEN": TOKEN! },
    // cache at the route level (revalidate), not per-request
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitLab ${endpoint} → ${res.status}`);
  return { data: (await res.json()) as T, nextPage: res.headers.get("x-next-page") };
}

type GlEvent = {
  created_at: string;
  project_id: number;
  push_data?: { commit_count: number; ref?: string };
};
type GlProject = {
  id: number;
  name: string;
  path_with_namespace: string;
  description: string | null;
  last_activity_at: string;
  star_count: number;
  web_url: string;
  visibility: "private" | "internal" | "public";
  topics?: string[];
};

async function fetchFromApi(): Promise<GitlabSummary> {
  const { data: users } = await gl<{ id: number }[]>(
    `/users?username=${encodeURIComponent(USERNAME!)}`
  );
  if (!users[0]) throw new Error(`GitLab user "${USERNAME}" not found`);
  const userId = users[0].id;

  const after = new Date();
  after.setFullYear(after.getFullYear() - 1);
  const afterStr = after.toISOString().slice(0, 10);

  // --- push events, paginated -------------------------------------------
  const events: GlEvent[] = [];
  for (let page = 1; page <= MAX_EVENT_PAGES; page++) {
    const { data, nextPage } = await gl<GlEvent[]>(
      `/users/${userId}/events?action=pushed&after=${afterStr}&per_page=100&page=${page}`
    );
    events.push(...data);
    if (!nextPage) break;
  }

  // --- projects ------------------------------------------------------------
  const { data: rawProjects } = await gl<GlProject[]>(
    `/projects?membership=true&order_by=last_activity_at&per_page=60`
  );

  return buildSummary(events, rawProjects, "api");
}

// ---------------------------------------------------------------------------
// Aggregation + sanitization (shared with scripts/sync-stats.mjs logic)
// ---------------------------------------------------------------------------
function buildSummary(
  events: GlEvent[],
  rawProjects: GlProject[],
  source: GitlabSummary["source"]
): GitlabSummary {
  const projectById = new Map(rawProjects.map((p) => [p.id, p]));

  // heatmap: date → commit count
  const byDay = new Map<string, number>();
  for (const ev of events) {
    const day = ev.created_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + (ev.push_data?.commit_count ?? 1));
  }
  const heatmap: HeatmapDay[] = [...byDay.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // recent pushes (sanitized)
  const recent: RecentPush[] = events.slice(0, 8).map((ev) => {
    const p = projectById.get(ev.project_id);
    const allowed = p && isAllowed(p);
    return {
      date: ev.created_at,
      commitCount: ev.push_data?.commit_count ?? 1,
      projectLabel: allowed ? p!.name : "private project",
      isPrivate: !allowed,
      branch: allowed ? ev.push_data?.ref : undefined,
    };
  });

  // project cards: real ones for allowlist, the rest counted anonymously
  const visible: ProjectCard[] = [];
  let privateProjects = 0;
  for (const p of rawProjects) {
    if (isAllowed(p)) {
      visible.push({
        name: p.name,
        description: p.description,
        lastActivityAt: p.last_activity_at,
        stars: p.star_count,
        url: p.visibility === "public" ? p.web_url : null,
        topics: p.topics ?? [],
      });
    } else {
      privateProjects++;
    }
  }

  const commitsLastYear = heatmap.reduce((s, d) => s + d.count, 0);
  return {
    generatedAt: new Date().toISOString(),
    source,
    totals: {
      commitsLastYear,
      activeDays: heatmap.length,
      currentStreak: streak(byDay),
      privateProjects,
    },
    heatmap,
    recent,
    projects: visible,
  };
}

function isAllowed(p: GlProject): boolean {
  return (
    p.visibility === "public" ||
    ALLOWLIST.has(p.path_with_namespace.toLowerCase())
  );
}

function streak(byDay: Map<string, number>): number {
  let n = 0;
  const d = new Date();
  // a streak may still be alive if today has no push yet
  if (!byDay.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (byDay.has(d.toISOString().slice(0, 10))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// ---------------------------------------------------------------------------
// Mode: demo — lets the page render before any env is configured
// ---------------------------------------------------------------------------
function demoSummary(): GitlabSummary {
  const heatmap: HeatmapDay[] = [];
  const byDay = new Map<string, number>();
  const d = new Date();
  for (let i = 364; i >= 0; i--) {
    const day = new Date(d);
    day.setDate(d.getDate() - i);
    // weekday-heavy pseudo-random pattern
    const wd = day.getDay();
    const seed = (day.getDate() * 7 + day.getMonth() * 3 + wd) % 11;
    const count = wd === 0 ? 0 : seed > 6 ? seed : seed > 3 ? seed - 3 : 0;
    if (count > 0) {
      const key = day.toISOString().slice(0, 10);
      heatmap.push({ date: key, count });
      byDay.set(key, count);
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    source: "demo",
    totals: {
      commitsLastYear: heatmap.reduce((s, x) => s + x.count, 0),
      activeDays: heatmap.length,
      currentStreak: streak(byDay),
      privateProjects: 6,
    },
    heatmap,
    recent: [
      { date: new Date().toISOString(), commitCount: 4, projectLabel: "private project", isPrivate: true },
      { date: new Date(Date.now() - 86400000).toISOString(), commitCount: 7, projectLabel: "japanese-n3-app", isPrivate: false, branch: "main" },
      { date: new Date(Date.now() - 2 * 86400000).toISOString(), commitCount: 2, projectLabel: "private project", isPrivate: true },
    ],
    projects: [
      {
        name: "japanese-n3-app",
        description: "JLPT N3 grammar trainer — 125 curated items, furigana, AI-generated quizzes.",
        lastActivityAt: new Date().toISOString(),
        stars: 12,
        url: "https://gitlab.com",
        topics: ["nextjs", "drizzle", "anthropic-api"],
      },
      {
        name: "services-monorepo",
        description: "Turborepo hosting a calibration-booking tool and a friend-group resale marketplace.",
        lastActivityAt: new Date().toISOString(),
        stars: 4,
        url: "https://gitlab.com",
        topics: ["turborepo", "neon", "clerk"],
      },
    ],
  };
}
