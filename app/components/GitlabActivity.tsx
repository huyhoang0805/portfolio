import type { GitlabSummary, ProjectCard, RecentPush } from "@/lib/gitlab/types";

// ── Shared card style (matches About page cards) ───────────
const cardStyle = {
  background: "rgba(3,232,252,0.06)",
  border: "1px solid rgba(3,232,252,0.15)",
} as const;

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
    { value: totals.commitsLastYear, label: "Commits / year" },
    { value: totals.activeDays, label: "Active days" },
    { value: totals.currentStreak, label: "Day streak" },
    { value: totals.privateProjects, label: "Private projects" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl p-3 text-center" style={cardStyle}>
          <p className="text-xl font-bold leading-none" style={{ color: "#03e8fc" }}>
            {s.value}
          </p>
          <p className="text-[10px] mt-1.5 leading-tight" style={{ color: "#9090a8" }}>
            {s.label}
          </p>
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
          <span className="truncate" style={{ color: "#b0b0c8" }}>
            <span
              className="inline-block w-2 h-2 rounded-[2px] mr-2 translate-y-px"
              style={{ background: "#0097a8" }}
            />
            pushed{" "}
            <span className="font-mono font-medium" style={{ color: "#03e8fc" }}>
              {p.commitCount} commit{p.commitCount === 1 ? "" : "s"}
            </span>{" "}
            to{" "}
            {p.isPrivate ? (
              <span className="italic" style={{ color: "#6b7a99" }}>
                {p.projectLabel}
              </span>
            ) : (
              <span className="font-medium text-white">{p.projectLabel}</span>
            )}
            {p.branch ? (
              <span className="font-mono text-xs" style={{ color: "#6b7a99" }}>
                {" "}· {p.branch.replace("refs/heads/", "")}
              </span>
            ) : null}
          </span>
          <time className="shrink-0 font-mono text-xs" style={{ color: "#6b7a99" }}>
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
        <div key={p.name} className="rounded-2xl p-5 flex flex-col gap-2" style={cardStyle}>
          <div className="flex items-center justify-between gap-2">
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sm text-white hover:underline truncate"
              >
                {p.name}
              </a>
            ) : (
              <p className="font-semibold text-sm text-white truncate">{p.name}</p>
            )}
            <span className="shrink-0 text-xs font-mono" style={{ color: "#6b7a99" }}>
              ★ {p.stars}
            </span>
          </div>
          {p.description ? (
            <p className="text-xs leading-relaxed" style={{ color: "#9090a8" }}>
              {p.description}
            </p>
          ) : null}
          {p.topics.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {p.topics.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    background: "rgba(3,232,252,0.1)",
                    color: "#9ff5ff",
                    border: "1px solid rgba(3,232,252,0.2)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          <p className="text-[10px] font-mono" style={{ color: "#6b7a99" }}>
            last active {relativeTime(p.lastActivityAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
