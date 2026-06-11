import { NextResponse } from "next/server";
import { getGitlabSummary } from "@/lib/gitlab";

export const revalidate = 21600;

/**
 * Backward-compatible shape for the contribution graph:
 * { total, byDate } — derived from the shared GitLab summary
 * (works in api / static / demo mode, see lib/gitlab).
 */
export async function GET() {
  const summary = await getGitlabSummary();

  const byDate: Record<string, number> = {};
  for (const day of summary.heatmap) {
    byDate[day.date] = day.count;
  }

  return NextResponse.json({
    total: summary.totals.commitsLastYear,
    byDate,
    source: summary.source,
  });
}
