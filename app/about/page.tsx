import { ContributionGraphSection } from "../components/ContributionGraphSection";
import { GitlabProjects, GitlabStats, RecentActivity } from "../components/GitlabActivity";
import { Navbar } from "../components/Navbar";
import { EDUCATION, LANGUAGES, PERSONAL, SOCIALS } from "../data/content";
import { getGitlabSummary } from "@/lib/gitlab";

// GitLab data is ISR-cached for 6 hours
export const revalidate = 21600;

function SidebarCard({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl p-4 text-sm border border-(--border-color) bg-(--bg-card)">
      {label ? (
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
          {label}
        </p>
      ) : null}
      {children}
    </div>
  );
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
      {children}
    </h2>
  );
}

export default async function AboutPage() {
  const { name, roles, currentRole, currentCompany, bio } = PERSONAL;
  const summary = await getGitlabSummary();

  const byDate: Record<string, number> = {};
  for (const day of summary.heatmap) byDate[day.date] = day.count;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className="lg:w-72 shrink-0 flex flex-col gap-5">
            {/* Name */}
            <div>
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-foreground">
                {name}
              </h1>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                {roles[0].replace(".", "").toLowerCase()}
              </p>
            </div>

            {/* Current position + contact */}
            <SidebarCard>
              <p className="text-muted-foreground">
                {currentRole} at{" "}
                <a
                  href={currentCompany.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary hover:text-accent-bright transition-colors duration-200"
                >
                  {currentCompany.name}
                </a>
              </p>
              <div className="mt-3 pt-3 flex flex-col gap-1.5 font-mono text-xs text-muted-foreground border-t border-(--border-color)">
                <p>{PERSONAL.birthday}</p>
                <a href={`tel:${PERSONAL.phone}`} className="hover:text-foreground transition-colors duration-200">
                  {PERSONAL.phone}
                </a>
                <a href={`mailto:${PERSONAL.email}`} className="hover:text-foreground transition-colors duration-200">
                  {PERSONAL.email}
                </a>
              </div>
            </SidebarCard>

            {/* Education */}
            <SidebarCard label="education">
              <p className="font-semibold text-foreground text-sm">{EDUCATION.school}</p>
              <p className="text-xs mt-1 text-muted-foreground">{EDUCATION.schoolVi}</p>
              <p className="text-xs mt-1 text-muted-foreground">
                {EDUCATION.major} · {EDUCATION.cohort}
              </p>
            </SidebarCard>

            {/* Languages */}
            <SidebarCard label="languages">
              <ul className="flex flex-col gap-1.5">
                {LANGUAGES.map((l) => (
                  <li key={l.label} className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="font-medium text-foreground">{l.label}</span>
                    <span className="text-right text-muted-foreground">{l.level}</span>
                  </li>
                ))}
              </ul>
            </SidebarCard>

            {/* GitLab stats */}
            <GitlabStats totals={summary.totals} />

            {/* Contribution graph */}
            <SidebarCard label="code activity">
              <ContributionGraphSection
                total={summary.totals.commitsLastYear}
                byDate={byDate}
              />
            </SidebarCard>

            {/* CV download */}
            <a
              href={PERSONAL.cvUrl}
              download
              className="rounded-lg p-3.5 font-mono text-xs font-semibold text-center bg-primary text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              ↓ download cv
            </a>

            {/* Social links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {label.toLowerCase()} ↗
                </a>
              ))}
            </div>
          </aside>

          {/* ── Main content ────────────────────────────────── */}
          <section className="flex-1 min-w-0">
            {/* Introduction */}
            <div className="mb-12">
              <MainHeading>introduction</MainHeading>
              <p className="text-base leading-relaxed whitespace-pre-line text-foreground/75 max-w-2xl">
                {bio}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-12">
              <MainHeading>experience</MainHeading>
              <div className="rounded-xl p-5 border border-(--border-color) bg-(--bg-card)">
                <p className="font-semibold text-foreground text-sm">{currentRole}</p>
                <p className="font-mono text-xs mt-1 text-muted-foreground">
                  {currentCompany.name} · full-time
                </p>
              </div>
            </div>

            {/* Recent GitLab activity */}
            {summary.recent.length > 0 && (
              <div className="mb-12">
                <MainHeading>recent activity</MainHeading>
                <RecentActivity items={summary.recent} />
              </div>
            )}

            {/* GitLab projects */}
            {summary.projects.length > 0 && (
              <div>
                <MainHeading>projects on gitlab</MainHeading>
                <GitlabProjects projects={summary.projects} />
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
