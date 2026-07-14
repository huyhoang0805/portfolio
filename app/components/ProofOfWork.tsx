import { ContributionGraphSection } from "./ContributionGraphSection";
import { CountUp } from "./CountUp";
import { RecentActivity } from "./GitlabActivity";
import { SpotlightCard } from "./SpotlightCard";
import { SECTION_HEADINGS } from "../data/content";
import type { GitlabSummary } from "@/lib/gitlab/types";

export interface ProofOfWorkProps {
  summary: GitlabSummary;
}

/** Signature section — data GitLab thật, không thể prompt ra được. Server Component. */
export function ProofOfWork({ summary }: ProofOfWorkProps) {
  const { totals, heatmap, recent } = summary;
  if (totals.commitsLastYear === 0 && recent.length === 0) return null;

  const byDate: Record<string, number> = {};
  for (const day of heatmap) byDate[day.date] = day.count;

  const stats = [
    { to: totals.commitsLastYear, label: "commits / year" },
    { to: totals.activeDays, label: "active days" },
    { to: totals.currentStreak, label: "day streak" },
    { to: totals.privateProjects, label: "private projects" },
  ];

  return (
    <section id="proof" className="py-24">
      <div className="max-w-2xl">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-foreground">
          {SECTION_HEADINGS.proofOfWork.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          {SECTION_HEADINGS.proofOfWork.sub}
        </p>
      </div>

      {/* Stat row — mono, count-up khi scroll tới */}
      <dl className="flex flex-wrap gap-x-12 gap-y-4 mt-10 font-mono">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-3xl font-bold text-primary leading-none">
              <CountUp to={stat.to} />
            </dd>
            <dd className="text-[11px] text-muted-foreground mt-2 tracking-wide">{stat.label}</dd>
          </div>
        ))}
      </dl>

      {/* Heatmap */}
      <SpotlightCard className="mt-10 rounded-xl border border-(--border-color) bg-(--bg-card) p-5">
        <ContributionGraphSection total={totals.commitsLastYear} byDate={byDate} />
      </SpotlightCard>

      {/* Recent pushes — sanitized */}
      {recent.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            recent pushes
          </p>
          <RecentActivity items={recent.slice(0, 6)} />
        </div>
      )}
    </section>
  );
}
