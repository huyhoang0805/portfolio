#!/usr/bin/env node
/**
 * Plan B — runs INSIDE company GitLab CI (scheduled pipeline).
 * The runner can reach the internal GitLab API even when the internet can't.
 *
 * It aggregates your push activity into an anonymized summary and commits
 * data/gitlab-summary.json to your PORTFOLIO repo (on gitlab.com or GitHub),
 * which triggers a redeploy on Vercel.
 *
 * Required CI variables (Settings → CI/CD → Variables, masked):
 *   GITLAB_BASE_URL          e.g. https://gitlab.your-company.com
 *   GITLAB_TOKEN             PAT with read_api (your personal token)
 *   GITLAB_USERNAME          your username on the company instance
 *   GITLAB_PUBLIC_PROJECTS   comma-separated path_with_namespace allowlist (optional)
 *   PORTFOLIO_REPO_URL       https://oauth2:<token>@gitlab.com/you/portfolio.git
 *
 * No company project names, branch names, or commit messages leave the
 * network unless the project is in the allowlist.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";

const BASE = process.env.GITLAB_BASE_URL?.replace(/\/$/, "");
const TOKEN = process.env.GITLAB_TOKEN;
const USERNAME = process.env.GITLAB_USERNAME;
const REPO = process.env.PORTFOLIO_REPO_URL;
const ALLOW = new Set(
  (process.env.GITLAB_PUBLIC_PROJECTS ?? "")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
);

if (!BASE || !TOKEN || !USERNAME) {
  console.error("Missing GITLAB_BASE_URL / GITLAB_TOKEN / GITLAB_USERNAME");
  process.exit(1);
}

const api = async (endpoint) => {
  const res = await fetch(`${BASE}/api/v4${endpoint}`, {
    headers: { "PRIVATE-TOKEN": TOKEN },
  });
  if (!res.ok) throw new Error(`${endpoint} -> ${res.status}`);
  return { json: await res.json(), next: res.headers.get("x-next-page") };
};

const main = async () => {
  const { json: users } = await api(`/users?username=${encodeURIComponent(USERNAME)}`);
  if (!users[0]) throw new Error(`user ${USERNAME} not found`);
  const uid = users[0].id;

  const after = new Date();
  after.setFullYear(after.getFullYear() - 1);
  const afterStr = after.toISOString().slice(0, 10);

  const events = [];
  for (let page = 1; page <= 40; page++) {
    const { json, next } = await api(
      `/users/${uid}/events?action=pushed&after=${afterStr}&per_page=100&page=${page}`
    );
    events.push(...json);
    if (!next) break;
  }

  const { json: projects } = await api(
    `/projects?membership=true&order_by=last_activity_at&per_page=60`
  );
  const byId = new Map(projects.map((p) => [p.id, p]));
  const allowed = (p) => p && (p.visibility === "public" || ALLOW.has(p.path_with_namespace.toLowerCase()));

  const byDay = new Map();
  for (const ev of events) {
    const day = ev.created_at.slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + (ev.push_data?.commit_count ?? 1));
  }
  const heatmap = [...byDay.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const recent = events.slice(0, 8).map((ev) => {
    const p = byId.get(ev.project_id);
    const ok = allowed(p);
    return {
      date: ev.created_at,
      commitCount: ev.push_data?.commit_count ?? 1,
      projectLabel: ok ? p.name : "private project",
      isPrivate: !ok,
      branch: ok ? ev.push_data?.ref : undefined,
    };
  });

  const visible = [];
  let privateProjects = 0;
  for (const p of projects) {
    if (allowed(p)) {
      visible.push({
        name: p.name,
        description: p.description,
        lastActivityAt: p.last_activity_at,
        stars: p.star_count,
        url: p.visibility === "public" ? p.web_url : null,
        topics: p.topics ?? [],
      });
    } else privateProjects++;
  }

  const streak = (() => {
    let n = 0;
    const d = new Date();
    if (!byDay.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
    while (byDay.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  })();

  const summary = {
    generatedAt: new Date().toISOString(),
    source: "static",
    totals: {
      commitsLastYear: heatmap.reduce((s, x) => s + x.count, 0),
      activeDays: heatmap.length,
      currentStreak: streak,
      privateProjects,
    },
    heatmap,
    recent,
    projects: visible,
  };

  if (!REPO) {
    fs.mkdirSync("data", { recursive: true });
    fs.writeFileSync("data/gitlab-summary.json", JSON.stringify(summary, null, 2));
    console.log("Wrote data/gitlab-summary.json (no PORTFOLIO_REPO_URL set, skipping push).");
    return;
  }

  execSync(`git clone --depth 1 "${REPO}" /tmp/portfolio`, { stdio: "inherit" });
  fs.mkdirSync("/tmp/portfolio/data", { recursive: true });
  fs.writeFileSync("/tmp/portfolio/data/gitlab-summary.json", JSON.stringify(summary, null, 2));
  execSync(
    [
      `cd /tmp/portfolio`,
      `git config user.email "sync-bot@ci"`,
      `git config user.name "gitlab-stats-sync"`,
      `git add data/gitlab-summary.json`,
      `git diff --cached --quiet || git commit -m "chore: sync gitlab stats"`,
      `git push`,
    ].join(" && "),
    { stdio: "inherit", shell: "/bin/sh" }
  );
  console.log("Pushed updated stats to portfolio repo.");
};

main().catch((err) => { console.error(err); process.exit(1); });
