export type HeatmapDay = {
  date: string; // YYYY-MM-DD
  count: number; // commits pushed that day
};

export type RecentPush = {
  date: string; // ISO
  commitCount: number;
  /** Sanitized: real name only for allowlisted projects */
  projectLabel: string;
  isPrivate: boolean;
  branch?: string;
};

export type ProjectCard = {
  name: string;
  description: string | null;
  lastActivityAt: string;
  stars: number;
  url: string | null; // null for private/company projects
  topics: string[];
};

export type GitlabSummary = {
  generatedAt: string;
  source: "api" | "static" | "demo";
  totals: {
    commitsLastYear: number;
    activeDays: number;
    currentStreak: number;
    privateProjects: number;
  };
  heatmap: HeatmapDay[];
  recent: RecentPush[];
  projects: ProjectCard[];
};
