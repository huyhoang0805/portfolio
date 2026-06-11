"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  type Activity,
} from "@/components/kibo-ui/contribution-graph";
import { eachDayOfInterval, formatISO, subYears } from "date-fns";

export interface ContributionGraphSectionProps {
  total: number;
  byDate: Record<string, number>;
}

// Cyan color ramp: level 0 (empty) → level 4 (most active)
const LEVEL_COLORS = ["#001020", "#003344", "#005566", "#0097a8", "#03e8fc"] as const;

function buildActivityData(byDate: Record<string, number>): Activity[] {
  const now = new Date();
  const start = subYears(now, 1);
  const days = eachDayOfInterval({ start, end: now });

  const counts = Object.values(byDate);
  const maxCount = counts.length ? Math.max(...counts) : 1;

  return days.map((day) => {
    const date = formatISO(day, { representation: "date" });
    const count = byDate[date] ?? 0;
    const level =
      count === 0 ? 0 : Math.min(4, Math.ceil((count / maxCount) * 4));
    return { date, count, level };
  });
}

export function ContributionGraphSection({ total, byDate }: ContributionGraphSectionProps) {
  const activities = buildActivityData(byDate);

  return (
    <div className="w-full overflow-x-auto">
      <p className="text-xs mb-2 font-medium" style={{ color: "#9090a8" }}>
        {total} contributions in the last year
      </p>

      <ContributionGraph
        data={activities}
        blockSize={10}
        blockMargin={2}
        blockRadius={2}
        fontSize={9}
        totalCount={total}
      >
        <ContributionGraphCalendar>
          {({ activity, dayIndex, weekIndex }) => (
            <ContributionGraphBlock
              activity={activity}
              dayIndex={dayIndex}
              weekIndex={weekIndex}
              // Use inline style for reliable SVG fill color
              style={{ fill: LEVEL_COLORS[activity.level as 0 | 1 | 2 | 3 | 4] }}
            />
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="mt-2 justify-end">
          <ContributionGraphLegend>
            {({ level }) => (
              <svg height={10} width={10}>
                <rect
                  height={10}
                  width={10}
                  rx={2}
                  ry={2}
                  style={{ fill: LEVEL_COLORS[level as 0 | 1 | 2 | 3 | 4] }}
                />
              </svg>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}
