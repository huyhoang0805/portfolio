// ============================================================
//  content.ts  —  Chỉnh sửa toàn bộ nội dung portfolio tại đây
//  CV đính kèm: public/cv/Nguyen_Van_Hoang_CV.docx
// ============================================================

// ── Thông tin cá nhân ──────────────────────────────────────
export const PERSONAL = {
  name: "Nguyễn Huy Hoàng",
  email: "nh88099@gmail.com",
  phone: "0962790160",
  birthday: "08/05/2002",

  heroTagline: "A Developer who",
  heroHeadline: ["Builds products", "that"],
  heroHighlight: "actually ship",
  heroCaption:
    "Software Engineer — sole frontend owner of AhaFood.ai, builder of AI-powered onboarding for the Franchise Portal.",
  availableForWork: true,

  /** Các vai trò trong hiệu ứng typing */
  roles: ["Software Engineer.", "React / Next.js Dev.", "AI Integration Builder."],

  currentRole: "Software Engineer",
  currentCompany: { name: "Ahamove", url: "https://ahamove.com", emoji: "🚀" },

  bio: `Software Engineer with nearly 3 years of experience building responsive, production-grade web applications with React, Next.js, and TypeScript.
Sole owner of the entire frontend for AhaFood.ai — an e-commerce webstore embedded as a webview inside the Ahamove super-app — from UI implementation to backend API integration and GA4 product analytics.
Most recently built AI Agent integration for the Franchise Portal: an AI menu-extraction agent that reads menu photos and streams detected items live into the onboarding UI over SSE.`,

  contactBlurb: `I'm open to product-focused roles where I can own the front-end
of something real. If you're building with Next.js, React, or integrating AI features,
let's talk.`,

  footerCredit: "Built by Nguyễn Huy Hoàng",

  /** Đường dẫn file CV trong public/ */
  cvUrl: "/cv/Nguyen_Van_Hoang_CV.docx",
};

// ── Stat chips quanh avatar ở Hero ─────────────────────────
export const HERO_STATS = [
  { value: "3", label: "Years Experience" },
  { value: "6", label: "Apps Shipped" },
  { value: "600+", label: "Commits / Year" },
  { value: "100%", label: "FE Ownership" },
];

// ── Điều hướng ─────────────────────────────────────────────
// Dùng path tuyệt đối để hoạt động từ mọi trang (kể cả /about)
export const NAV_LINKS = [
  { label: "Home",       href: "/"          },
  { label: "About",      href: "/about"     },
  { label: "Projects",   href: "/#projects" },
  { label: "Contact",    href: "/#contact"  },
];

// ── Mạng xã hội ────────────────────────────────────────────
export const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/huyhoang0805",       icon: "github"   },
  { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_LINKEDIN", icon: "linkedin" }, // TODO
] as const;

// ── Tech stack ─────────────────────────────────────────────
export const TECH_ROW1 = [
  { label: "Next.js",        icon: "SiNextdotjs",      color: "#1a1a2e" },
  { label: "React",          icon: "FaReact",           color: "#1e3a5f" },
  { label: "TypeScript",     icon: "SiTypescript",      color: "#1c3a6e" },
  { label: "TanStack Start", icon: "SiTanstack",        color: "#2e1a0e" },
  { label: "TailwindCSS",    icon: "SiTailwindcss",     color: "#0e3040" },
  { label: "TanStack Query", icon: "SiReactquery",      color: "#1a2e1a" },
  { label: "Zustand",        icon: "SiZustand",         color: "#2a1a3a" },
  { label: "Zod",            icon: "SiZod",             color: "#1a2a4a" },
];

export const TECH_ROW2 = [
  { label: "Turborepo",     icon: "SiTurborepo",   color: "#1a1a1a" },
  { label: "PostgreSQL",    icon: "SiPostgresql",  color: "#1c3a6e" },
  { label: "Drizzle ORM",   icon: "SiDrizzle",     color: "#1a2e1a" },
  { label: "Vitest",        icon: "SiVitest",      color: "#2e2a0e" },
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
    title: "Software Engineer — AhaFood.ai (Ahamove)",
    desc: "Sole frontend owner of the AhaFood.ai webstore (Next.js, React, TypeScript) — a food e-commerce platform running as a webview embedded inside the Ahamove app. Full UI layer + end-to-end backend REST API integration.",
    link: "https://ahafood.ai",
  },
  {
    emoji: "🤖",
    title: "AI Agent Integration — Franchise Portal",
    desc: "Built AI-powered merchant onboarding: menu photos are analyzed by an AI extraction agent, detected items & prices stream live into the scanning UI over SSE (Server-Sent Events) — with client-side image compression and an alternative flow that crawls menus from food-platform URLs.",
    link: "#",
  },
  {
    emoji: "🏗️",
    title: "Software Engineer — Franchise Portal (Ahamove)",
    desc: "Multi-role franchise & merchant portal on TanStack Start (React 19, SSR via Nitro, GCP Cloud Run): type-safe BFF server functions, OTP auth with HttpOnly cookies, and granular RBAC across admin / partner / merchant dashboards.",
    link: "#",
  },
  {
    emoji: "🧠",
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
    title: "Franchise Portal — AI Merchant Onboarding",
    description:
      "Multi-role franchise management portal (admin / partner / merchant) built on TanStack Start with SSR via Nitro, deployed on GCP Cloud Run. Highlight: AI-powered onboarding — merchants upload a menu photo, an AI extraction agent reads items & prices, and results stream live into the UI over SSE; an alternative flow crawls menus straight from food-platform URLs. Type-safe BFF server functions, OTP auth with HttpOnly cookies, and a granular RBAC permission matrix.",
    tech: ["TanStack Start", "React 19", "TypeScript", "Nitro", "AI Agent", "SSE Streaming", "RBAC"],
    githubUrl: "#",           // private repo
    liveUrl: "#",
    reverse: false,
  },
  {
    title: "AhaFood.ai — Customer Storefront",
    description:
      "Consumer-facing food e-commerce platform embedded as a webview inside the Ahamove super-app. Full UI layer with end-to-end REST API integration, responsive across mobile webview and desktop. Includes a batch food-image editing tool for merchants built with react-konva (drag/resize/rotate, two-stage local-then-AI processing) and shared FE/BE authorization with CASL v7.",
    tech: ["Next.js", "TypeScript", "TanStack Query", "react-konva", "CASL", "Tailwind"],
    githubUrl: "#",           // private repo
    liveUrl: "https://ahafood.ai",
    reverse: true,
  },
  {
    title: "Japanese Learning App — hoc-n3",
    description:
      "Full-stack web app with a curated dataset of 125 JLPT N5–N3 grammar items, furigana annotation, and AI-generated quizzes via the Anthropic API. Built end-to-end with Next.js, Drizzle ORM, and PostgreSQL — deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "Anthropic API"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://hoc-n3.vercel.app",
    reverse: false,
  },
  {
    title: "Personal Services Monorepo — canman",
    description:
      "Turborepo + pnpm monorepo hosting two products — a booking tool for monitor color-calibration services and a friend-group resale/repair marketplace. Next.js Route Handlers, Neon + Drizzle, Clerk auth, UploadThing, Telegram notifications, and Vercel Cron.",
    tech: ["Turborepo", "Next.js", "Neon", "Drizzle ORM", "Clerk", "Vercel Cron"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://canman.hoangnh.io.vn",
    reverse: true,
  },
  {
    title: "3D Wheel Generator for 1:64 Diecast",
    description:
      "Parametric 3D model generator for diecast hobbyists: React/Next.js frontend combined with OpenSCAD compiled to WebAssembly and Claude API integration (BYOK model) for natural-language wheel design — preview in Three.js, export print-ready STL.",
    tech: ["Next.js", "TypeScript", "OpenSCAD WASM", "Three.js", "Claude API"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "#",
    reverse: false,
  },
];
