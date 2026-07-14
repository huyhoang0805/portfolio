import { SpotlightCard } from "./SpotlightCard";
import type { GitlabSummary, ProjectCard, RecentPush } from "@/lib/gitlab/types";

function relativeTime(iso: string): string {
  const diff = Date.now() - +new Date(iso);
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// ── Totals: commits / active days / streak / private count ─
export function GitlabStats({ totals }: { totals: GitlabSummary["totals"] }) {
  const stats = [
    { value: totals.commitsLastYear, label: "commits / year" },
    { value: totals.activeDays, label: "active days" },
    { value: totals.currentStreak, label: "day streak" },
    { value: totals.privateProjects, label: "private projects" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 font-mono">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-lg p-3 text-center border border-(--border-color) bg-(--bg-card)"
        >
          <p className="text-xl font-bold leading-none text-primary">{s.value}</p>
          <p className="text-[10px] mt-1.5 leading-tight text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Recent pushes (sanitized — private projects anonymized) ─
export function RecentActivity({ items }: { items: RecentPush[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((p, i) => (
        <li key={i} className="flex items-baseline justify-between gap-3 text-sm">
          <span className="truncate text-foreground/70">
            <span className="inline-block w-2 h-2 rounded-[2px] mr-2 translate-y-px bg-primary/70" />
            pushed{" "}
            <span className="font-mono font-medium text-primary">
              {p.commitCount} commit{p.commitCount === 1 ? "" : "s"}
            </span>{" "}
            to{" "}
            {p.isPrivate ? (
              <span className="italic text-muted-foreground">{p.projectLabel}</span>
            ) : (
              <span className="font-medium text-foreground">{p.projectLabel}</span>
            )}
            {p.branch ? (
              <span className="font-mono text-xs text-muted-foreground">
                {" "}· {p.branch.replace("refs/heads/", "")}
              </span>
            ) : null}
          </span>
          <time className="shrink-0 font-mono text-xs text-muted-foreground">
            {relativeTime(p.date)}
          </time>
        </li>
      ))}
    </ul>
  );
}

// ── Public/allowlisted GitLab projects ──────────────────────
export function GitlabProjects({ projects }: { projects: ProjectCard[] }) {
  if (projects.length === 0) return null;
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {projects.map((p) => (
        <SpotlightCard
          key={p.name}
          className="rounded-xl p-5 flex flex-col gap-2 border border-(--border-color) bg-(--bg-card) transition-colors duration-300 hover:border-primary/35"
        >
          <div className="flex items-center justify-between gap-2">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm text-foreground hover:text-primary transition-colors duration-200 truncate"
              >
                {p.name}
              </a>
            ) : (
              <p className="font-semibold text-sm text-foreground truncate">{p.name}</p>
            )}
            <span className="shrink-0 text-xs font-mono text-muted-foreground">
              ★ {p.stars}
            </span>
          </div>
          {p.description ? (
            <p className="text-xs leading-relaxed text-muted-foreground">{p.description}</p>
          ) : null}
          {p.topics.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {p.topics.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] border border-(--border-color) text-accent-bright"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <p className="text-[10px] font-mono text-muted-foreground">
            last active {relativeTime(p.lastActivityAt)}
          </p>
        </SpotlightCard>
      ))}
    </div>
  );
}
