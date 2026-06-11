// ============================================================
//  content.ts  —  Chỉnh sửa toàn bộ nội dung portfolio tại đây
//  Nội dung đồng bộ từ CV: public/cv/Nguyen_Van_Hoang_CV.docx
// ============================================================

// ── Thông tin cá nhân ──────────────────────────────────────
export const PERSONAL = {
  name: "Nguyễn Văn Hoàng",
  email: "nh88099@gmail.com",

  heroTagline: "A Developer who",
  heroHeadline: ["Builds products", "that"],
  heroHighlight: "actually ship",
  heroCaption:
    "Sole frontend owner of AhaFood.ai — from UI implementation to backend API integration and product analytics.",
  availableForWork: true,

  /** Các vai trò trong hiệu ứng typing */
  roles: ["Frontend Engineer.", "React / Next.js Dev.", "AI-Assisted Engineering."],

  currentRole: "Frontend Engineer",
  currentCompany: { name: "Ahamove", url: "https://ahamove.com", emoji: "🚀" },

  bio: `Frontend Engineer with 2+ years of experience building responsive, production-grade web applications with React, Next.js, and TypeScript.
Sole owner of the entire frontend for AhaFood.ai — an e-commerce webstore embedded as a webview inside the Ahamove super-app — from UI implementation to backend API integration and GA4 product analytics.
Experienced in AI-assisted development workflows: directing AI coding agents (Claude Code) with curated context, custom rules, and review skills to ship feature-level work with PR-quality output.`,

  contactBlurb: `I'm open to product-focused roles where I can own the front-end
of something real. If you're building with Next.js, React, or integrating AI features,
let's talk.`,

  footerCredit: "Built by Nguyễn Văn Hoàng",

  /** Đường dẫn file CV trong public/ */
  cvUrl: "/cv/Nguyen_Van_Hoang_CV.docx",
};

// ── Điều hướng ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",       href: "#"         },
  { label: "About",      href: "/about"    },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact"  },
];

// ── Mạng xã hội ────────────────────────────────────────────
export const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/YOUR_GITHUB",        icon: "github"   }, // TODO
  { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_LINKEDIN", icon: "linkedin" }, // TODO
] as const;

// ── Tech stack ─────────────────────────────────────────────
export const TECH_ROW1 = [
  { label: "Next.js",        icon: "SiNextdotjs",      color: "#1a1a2e" },
  { label: "React",          icon: "FaReact",           color: "#1e3a5f" },
  { label: "TypeScript",     icon: "SiTypescript",      color: "#1c3a6e" },
  { label: "TailwindCSS",    icon: "SiTailwindcss",     color: "#0e3040" },
  { label: "TanStack Query", icon: "SiReactquery",      color: "#1a2e1a" },
  { label: "Zustand",        icon: "SiZustand",         color: "#2a1a3a" },
  { label: "Zod",            icon: "SiZod",             color: "#1a2a4a" },
];

export const TECH_ROW2 = [
  { label: "Turborepo",     icon: "SiTurborepo",   color: "#1a1a1a" },
  { label: "PostgreSQL",    icon: "SiPostgresql",  color: "#1c3a6e" },
  { label: "Drizzle ORM",   icon: "SiDrizzle",     color: "#1a2e1a" },
  { label: "Playwright",    icon: "SiPlaywright",  color: "#1a3a2a" },
  { label: "Framer Motion", icon: "SiFramer",      color: "#1a1a3a" },
  { label: "GitLab CI",     icon: "SiGitlab",      color: "#3a1500" },
];

export const TECH_BLURB = {
  line1: "I'm looking to join a",
  highlight: "product-driven",
  line2: "team",
  sub: "that ships real features and cares about code quality",
};

// ── Kinh nghiệm làm việc ───────────────────────────────────
export const WORK_EXPERIENCE = [
  {
    emoji: "🚀",
    title: "Frontend Engineer — AhaFood.ai (Ahamove)",
    desc: "Sole frontend owner of the AhaFood.ai webstore (Next.js, React, TypeScript) — a food e-commerce platform running as a webview embedded inside the Ahamove app. Full UI layer + end-to-end backend REST API integration.",
    link: "https://ahafood.ai",
  },
  {
    emoji: "🤖",
    title: "AI-Assisted Engineering Workflow",
    desc: "Established the team's AI-assisted workflow: CLAUDE.md project configuration, modular coding rules, and custom agent skills (including a critical code-review skill) — shipping feature-level work through AI coding agents with PR-quality output.",
    link: "#",
  },
  {
    emoji: "📊",
    title: "GA4 Product Analytics",
    desc: "Led a full tracking audit, built city-based audience segments, and diagnosed a webview tracking undercount caused by history.replaceState stripping the ?webinapp parameter before GA4 fired — restoring accurate in-app attribution.",
    link: "#",
  },
  {
    emoji: "🏗️",
    title: "Frontend Engineer — Franchise Platform (Ahamove)",
    desc: "Built a franchise partner portal with TanStack Start (Nitro adapter): BFF-pattern server fetch layer with RSA request signing, HttpOnly-cookie auth flows, and a city-radius mapping tool using Haversine distance calculation.",
    link: "#",
  },
];

// ── Dự án nổi bật ──────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  /** true = mockup bên trái, text bên phải */
  reverse?: boolean;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "AhaFood.ai — Customer Storefront",
    description:
      "Consumer-facing food e-commerce platform embedded as a webview inside the Ahamove super-app. Full UI layer with end-to-end REST API integration, responsive across mobile webview and desktop. Includes a batch food-image editing tool for merchants built with react-konva (drag/resize/rotate, two-stage local-then-AI processing) and shared FE/BE authorization with CASL v7.",
    tech: ["Next.js", "TypeScript", "TanStack Query", "react-konva", "CASL", "Tailwind"],
    githubUrl: "#",           // private repo — để "#" hoặc bỏ nút
    liveUrl: "https://ahafood.ai",
    reverse: false,
  },
  {
    title: "Japanese Learning App",
    description:
      "Full-stack web app with a curated dataset of 125 JLPT N5–N3 grammar items, furigana annotation, and AI-generated quizzes via the Anthropic API. Built end-to-end with Next.js, Drizzle ORM, and PostgreSQL.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Anthropic API"],
    githubUrl: "#",
    liveUrl: "#",
    reverse: true,
  },
  {
    title: "Personal Services Monorepo",
    description:
      "Turborepo + pnpm monorepo hosting two products — a booking tool for monitor color-calibration services and a friend-group resale/repair marketplace. Next.js Route Handlers, Neon + Drizzle, Clerk auth, UploadThing, Telegram notifications, and Vercel Cron.",
    tech: ["Turborepo", "Next.js", "Neon", "Drizzle ORM", "Clerk", "Vercel Cron"],
    githubUrl: "#",
    liveUrl: "#",
    reverse: false,
  },
  {
    title: "3D Wheel Generator for 1:64 Diecast",
    description:
      "Parametric 3D model generator for diecast hobbyists: React/Next.js frontend combined with OpenSCAD compiled to WebAssembly and Claude API integration (BYOK model) for natural-language wheel design — preview in Three.js, export print-ready STL.",
    tech: ["Next.js", "TypeScript", "OpenSCAD WASM", "Three.js", "Claude API"],
    githubUrl: "#",
    liveUrl: "#",
    reverse: true,
  },
];
