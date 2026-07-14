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
  footerColophon:
    "Designed & built by me — Next.js · Tailwind v4 · Framer Motion. Activity data synced from a self-hosted GitLab via CI.",

  /** Đường dẫn file CV trong public/ */
  cvUrl: "/cv/Nguyen_Huy_Hoang_CV.pdf",
};

// ── Stat strip ở Hero (fallback khi chưa có data GitLab) ───
export const HERO_STATS = [
  { value: "3", label: "years experience" },
  { value: "6", label: "apps shipped" },
  { value: "600+", label: "commits / year" },
  { value: "100%", label: "FE ownership" },
];

// ── Live stat từ GitLab hiển thị ở Hero ────────────────────
export const HERO_LIVE_STAT = {
  commits: "commits · 12 months",
  activeDays: "active days",
  streak: "day streak",
  source: "live from self-hosted GitLab",
} as const;

// ── Dòng trạng thái mono trên headline ─────────────────────
export const HERO_STATUS = {
  openToWork: "open to work",
  location: "Ho Chi Minh City",
} as const;

// ── Heading các section trang chủ ──────────────────────────
export const SECTION_HEADINGS = {
  proofOfWork: {
    title: "Proof of work",
    sub: "Real activity, synced automatically from the self-hosted GitLab I ship from every day.",
  },
  experience: {
    title: "Experience",
  },
  companyProjects: {
    title: "Work — Ahamove",
    sub: "Production products I build and own",
  },
  personalProjects: {
    title: "Personal builds",
    sub: "Designed, built and deployed end-to-end",
  },
  contact: {
    title: "Get in touch",
  },
} as const;

// ── Điều hướng ─────────────────────────────────────────────
// Dùng path tuyệt đối để hoạt động từ mọi trang (kể cả /about)
export const NAV_LINKS = [
  { label: "Home",       href: "/"          },
  { label: "About",      href: "/about"     },
  { label: "Projects",   href: "/#projects" },
  { label: "Contact",    href: "/#contact"  },
];

export const NAV_CTA = { label: "hire me", href: "/#contact" } as const;

// ── Mạng xã hội ────────────────────────────────────────────
export const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/huyhoang0805",                              icon: "github"   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/huy-ho%C3%A0ng-nguy%E1%BB%85n-09b34124b", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/nh88099/",                            icon: "facebook" },
] as const;

// ── Học vấn ────────────────────────────────────────────────
export const EDUCATION = {
  school: "University of Information Technology (UIT) — VNU-HCM",
  schoolVi: "Trường Đại học Công nghệ Thông tin — ĐHQG TP.HCM",
  major: "Information Technology",
  cohort: "Khoá 2020",
};

// ── Ngoại ngữ ──────────────────────────────────────────────
export const LANGUAGES = [
  { label: "Vietnamese", level: "Native" },
  { label: "English",    level: "Intermediate" },
  { label: "Japanese",   level: "JLPT N4" },
];

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
    desc: "Sole frontend owner of AhaFood.ai — a Turborepo monorepo with customer storefront + merchant dashboard (Next.js 15, TypeScript) running as a webview inside the Ahamove super-app. AI chat ordering with real-time streaming (Vercel AI SDK), OIDC OAuth + OTP auth, next-intl i18n, GA4/Sentry observability.",
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

// ── Dự án nổi bật — dạng mini case-study ───────────────────
export interface ProjectOutcome {
  /** Con số / fact ngắn đặt trước (vd: "2000+") */
  value: string;
  label: string;
}

export interface Project {
  title: string;
  /** Vấn đề cần giải — 1-2 câu */
  problem: string;
  /** Giải pháp đã build — 2-3 câu, nêu tech thật */
  solution: string;
  /** Kết quả đo được — số đặt trước, chữ sau */
  outcomes: ProjectOutcome[];
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  /** company = dự án ở Ahamove · personal = dự án cá nhân */
  category: "company" | "personal";
}

export const FEATURED_PROJECTS: Project[] = [
  // ════ Dự án công ty (Ahamove) ════
  {
    title: "Franchise Portal — AI Merchant Onboarding",
    problem:
      "Onboarding a merchant meant manually re-typing every menu item and price from photos — slow, error-prone, and a bottleneck for franchise growth.",
    solution:
      "Built AI-powered onboarding on TanStack Start (React 19, SSR via Nitro, GCP Cloud Run): an AI extraction agent reads menu photos and streams detected items & prices live into the UI over SSE, with an alternative flow that crawls menus straight from food-platform URLs. Type-safe BFF server functions, OTP auth with HttpOnly cookies.",
    outcomes: [
      { value: "2", label: "onboarding flows — photo AI + URL crawler" },
      { value: "live", label: "SSE streaming into the scanning UI" },
      { value: "3", label: "roles under one granular RBAC matrix" },
    ],
    tech: ["TanStack Start", "React 19", "TypeScript", "Nitro", "AI Agent", "SSE Streaming", "RBAC"],
    githubUrl: "#",           // private repo
    liveUrl: "https://fc.ahamove.com",
    category: "company",
  },
  {
    title: "AhaFood.ai — Food E-commerce Platform",
    problem:
      "Ahamove needed a food-ordering storefront running inside its super-app webview — owned end-to-end by a single frontend engineer.",
    solution:
      "Turborepo monorepo powering two Next.js 15 apps — customer storefront and merchant dashboard — plus shared packages. AI chat ordering with real-time streaming (Vercel AI SDK v5), OIDC OAuth 2.0 + OTP auth, multi-locale i18n (next-intl), GA4/GTM tracking and Sentry monitoring, tested with Vitest + Playwright.",
    outcomes: [
      { value: "2000+", label: "merchants served" },
      { value: "3000+", label: "orders per day" },
      { value: "100%", label: "frontend ownership — one engineer" },
    ],
    tech: ["Next.js 15", "TypeScript", "Turborepo", "Vercel AI SDK", "TanStack Query", "OIDC OAuth", "next-intl", "GA4"],
    githubUrl: "#",           // private repo
    liveUrl: "https://ahafood.ai",
    category: "company",
  },

  // ════ Dự án cá nhân ════
  {
    title: "Japanese Learning App — hoc-n3",
    problem:
      "JLPT prep material is scattered across books and paid apps — I wanted one free tool covering grammar, kanji, vocabulary and mock tests for my own N3 study.",
    solution:
      "Fully static React SPA with no backend — everything ships as curated JSON datasets. Custom furigana renderer using <ruby> annotations with a global toggle, flashcard & quiz modes, progress persisted to localStorage via Zustand.",
    outcomes: [
      { value: "2,692", label: "vocabulary items across 50 lessons" },
      { value: "628", label: "kanji in 38 radical groups" },
      { value: "125", label: "grammar patterns + 10 full mock tests" },
    ],
    tech: ["React 18", "TypeScript", "Vite", "TanStack Router", "Zustand", "Radix UI", "Tailwind"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://hoc-n3.vercel.app",
    category: "personal",
  },
  {
    title: "Personal Services Monorepo — canman",
    problem:
      "My freelance side-services (color calibration booking, resale marketplace, affiliate links) each needed real infra — bookings, payments tracking, admin — without the overhead of running three separate stacks.",
    solution:
      "Turborepo + pnpm monorepo running three Next.js services on two isolated Neon Postgres databases (Drizzle ORM): distance-based pricing via Haversine + LocationIQ geocoding, Telegram-bot admin panel, ICS calendar feed, Claude-powered content drafting, Cloudinary signed uploads, Clerk auth with two isolated instances.",
    outcomes: [
      { value: "3", label: "production services, one monorepo" },
      { value: "2", label: "isolated Postgres databases" },
      { value: "0", label: "manual admin — Telegram bot + automation" },
    ],
    tech: ["Turborepo", "Next.js 14", "Neon + Drizzle", "Clerk", "Telegram Bot", "Claude API", "Cloudinary"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://canman.hoangnh.io.vn",
    category: "personal",
  },
  {
    title: "3D Wheel Generator for 1:64 Diecast",
    problem:
      "Custom wheels for 1:64 diecast cars require CAD skills most hobbyists don't have — they just know the dimensions and the look they want.",
    solution:
      "Describe a wheel through a Zod-validated form (diameter, spoke style, bearing holes, print tolerances) or a reference image; a dual-provider LLM integration (Claude / Gemini, BYOK) writes OpenSCAD code that compiles to print-ready STL entirely in the browser via OpenSCAD WASM, with live Three.js / R3F preview and STL upload + dimension detection for text-instruction editing.",
    outcomes: [
      { value: "100%", label: "in-browser — form to print-ready STL" },
      { value: "2", label: "LLM providers, bring-your-own-key" },
      { value: "0", label: "CAD knowledge required" },
    ],
    tech: ["Next.js 16", "TypeScript", "OpenSCAD WASM", "Three.js / R3F", "Claude & Gemini API", "Zustand", "CodeMirror"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://wheel-forge-two.vercel.app",
    category: "personal",
  },
];
