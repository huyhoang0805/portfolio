import { ContributionGraphSection } from "../components/ContributionGraphSection";
import { GitlabProjects, GitlabStats, RecentActivity } from "../components/GitlabActivity";
import { Navbar } from "../components/Navbar";
import { PERSONAL, SOCIALS } from "../data/content";
import { getGitlabSummary } from "@/lib/gitlab";

// GitLab data is ISR-cached for 6 hours
export const revalidate = 21600;

// Inline social icons (SVG) to avoid adding react-icons dependency here
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitlabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
      <path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.405.875.875 0 0 0-1 .054.875.875 0 0 0-.29.44L16.47 7.79H7.537L5.333 1.07a.857.857 0 0 0-.29-.441.875.875 0 0 0-1-.054.86.86 0 0 0-.336.405L.435 9.502l-.032.086a6.066 6.066 0 0 0 2.012 7.01l.011.009.03.021 4.977 3.727 2.462 1.863 1.5 1.132a1.008 1.008 0 0 0 1.22 0l1.499-1.132 2.461-1.863 5.006-3.75.013-.01a6.068 6.068 0 0 0 2.006-7.002z" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  gitlab: GitlabIcon,
};

export default async function AboutPage() {
  const { name, roles, currentRole, currentCompany, bio } = PERSONAL;
  const summary = await getGitlabSummary();

  const byDate: Record<string, number> = {};
  for (const day of summary.heatmap) byDate[day.date] = day.count;

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-20 px-6"
        style={{ background: "#000d14" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className="lg:w-72 shrink-0 flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                style={{
                  background:
                    "radial-gradient(circle at 40% 35%, #0097a8, #003344 60%, #001020 100%)",
                  boxShadow:
                    "0 0 40px rgba(3,232,252,0.4), 0 0 80px rgba(3,232,252,0.15)",
                }}
              >
                🧑‍💻
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-xl font-bold text-white">{name}</h1>
                <p className="text-sm mt-0.5" style={{ color: "#9090a8" }}>
                  {roles[0].replace(".", "")}
                </p>
              </div>
            </div>

            {/* Current position */}
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: "rgba(3,232,252,0.06)",
                border: "1px solid rgba(3,232,252,0.15)",
              }}
            >
              <p style={{ color: "#9090a8" }}>
                {currentRole} at{" "}
                <a
                  href={currentCompany.url}
                  className="font-semibold hover:underline"
                  style={{ color: "#1877f2" }}
                >
                  {currentCompany.emoji} {currentCompany.name}
                </a>
              </p>
            </div>

            {/* GitLab stats */}
            <GitlabStats totals={summary.totals} />

            {/* Contribution graph */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(3,232,252,0.06)",
                border: "1px solid rgba(3,232,252,0.15)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#7090a0" }}
              >
                Code Activity
              </p>
              <ContributionGraphSection
                total={summary.totals.commitsLastYear}
                byDate={byDate}
              />
            </div>

            {/* CV download */}
            <a
              href={PERSONAL.cvUrl}
              download
              className="rounded-xl p-4 text-sm font-semibold text-center transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #03e8fc, #0097a8)",
                color: "#07091a",
                boxShadow: "0 4px 24px rgba(3,232,252,0.35)",
              }}
            >
              ↓ Download CV
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon }) => {
                const Icon = ICON_MAP[icon];
                return Icon ? (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-2 rounded-lg transition-colors hover:bg-cyan-400/10"
                    style={{ color: "#9090a8" }}
                  >
                    <Icon />
                  </a>
                ) : null;
              })}
            </div>
          </aside>

          {/* ── Main content ────────────────────────────────── */}
          <section className="flex-1 min-w-0">
            {/* Introduction */}
            <div className="mb-10">
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#7090a0" }}
              >
                Introduction
              </h2>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(3,232,252,0.05)",
                  border: "1px solid rgba(3,232,252,0.12)",
                }}
              >
                <p
                  className="text-base leading-relaxed whitespace-pre-line"
                  style={{ color: "#b0b0c8" }}
                >
                  {bio}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-10">
              <h2
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#7090a0" }}
              >
                Experience
              </h2>
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: "rgba(3,232,252,0.05)",
                  border: "1px solid rgba(3,232,252,0.12)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5"
                    style={{
                      background: "linear-gradient(135deg, #003344, #0097a8)",
                    }}
                  >
                    {currentCompany.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {currentRole}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#9090a8" }}>
                      {currentCompany.name} · Full-time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent GitLab activity */}
            {summary.recent.length > 0 && (
              <div className="mb-10">
                <h2
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#7090a0" }}
                >
                  Recent Activity
                </h2>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(3,232,252,0.05)",
                    border: "1px solid rgba(3,232,252,0.12)",
                  }}
                >
                  <RecentActivity items={summary.recent} />
                </div>
              </div>
            )}

            {/* GitLab projects */}
            {summary.projects.length > 0 && (
              <div>
                <h2
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#7090a0" }}
                >
                  Projects on GitLab
                </h2>
                <GitlabProjects projects={summary.projects} />
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
