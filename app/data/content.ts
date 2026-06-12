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
  cvUrl: "/cv/Nguyen_Huy_Hoang_CV.pdf",
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
  { label: "English",    level: "Basic communication · technical English" },
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

// ── Dự án nổi bật ──────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  /** company = dự án ở Ahamove · personal = dự án cá nhân */
  category: "company" | "personal";
  /** true = mockup bên trái, text bên phải */
  reverse?: boolean;
}

export const FEATURED_PROJECTS: Project[] = [
  // ════ Dự án công ty (Ahamove) ════
  {
    title: "Franchise Portal — AI Merchant Onboarding",
    description:
      "Multi-role franchise management portal (admin / partner / merchant) built on TanStack Start with SSR via Nitro, deployed on GCP Cloud Run. Highlight: AI-powered onboarding — merchants upload a menu photo, an AI extraction agent reads items & prices, and results stream live into the UI over SSE; an alternative flow crawls menus straight from food-platform URLs. Type-safe BFF server functions, OTP auth with HttpOnly cookies, and a granular RBAC permission matrix.",
    tech: ["TanStack Start", "React 19", "TypeScript", "Nitro", "AI Agent", "SSE Streaming", "RBAC"],
    githubUrl: "#",           // private repo
    liveUrl: "https://fc.ahamove.com",
    category: "company",
    reverse: false,
  },
  {
    title: "AhaFood.ai — Food E-commerce Platform",
    description:
      "Turborepo monorepo powering two Next.js 15 apps — customer storefront and merchant dashboard — plus shared packages (@ahafood/ui, common-i18n, icons), serving 2000+ merchants and 3000+ orders per day. The storefront runs as a webview inside the Ahamove super-app with AI chat ordering: real-time streaming conversations via Vercel AI SDK v5 with context-aware food recommendations. OIDC OAuth 2.0 + OTP authentication, multi-locale i18n (next-intl), drag-and-drop menu management (@dnd-kit) on the merchant side, GA4/GTM event tracking and Sentry monitoring, tested with Vitest + Playwright.",
    tech: ["Next.js 15", "TypeScript", "Turborepo", "Vercel AI SDK", "TanStack Query", "OIDC OAuth", "next-intl", "GA4"],
    githubUrl: "#",           // private repo
    liveUrl: "https://ahafood.ai",
    category: "company",
    reverse: true,
  },

  // ════ Dự án cá nhân ════
  {
    title: "Japanese Learning App — hoc-n3",
    description:
      "JLPT study app built as a fully static React SPA — no backend, everything ships as curated JSON datasets: 125 grammar patterns (N5–N3) with 375 quiz items, 628 kanji organized into 38 radical groups, 2,692 vocabulary items across all 50 Minna no Nihongo lessons, 8 reading-comprehension passages and 10 full mock tests. Custom furigana renderer using <ruby> annotations with a global toggle, flashcard & quiz modes, and progress tracking persisted to localStorage via Zustand.",
    tech: ["React 18", "TypeScript", "Vite", "TanStack Router", "Zustand", "Radix UI", "Tailwind"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://hoc-n3.vercel.app",
    category: "personal",
    reverse: false,
  },
  {
    title: "Personal Services Monorepo — canman",
    description:
      "Turborepo + pnpm monorepo running three Next.js services on two isolated Neon Postgres databases (Drizzle ORM): a monitor color-calibration booking tool with distance-based pricing (Haversine + LocationIQ geocoding), a Telegram-bot admin panel, ICS calendar feed and Claude-powered content drafting; a resale/repair marketplace with Cloudinary signed uploads; and a Shopee affiliate link converter with click tracking, rate limiting and a cashback ledger. Clerk auth with two isolated instances, notifications via Telegram Bot API + Resend.",
    tech: ["Turborepo", "Next.js 14", "Neon + Drizzle", "Clerk", "Telegram Bot", "Claude API", "Cloudinary"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://canman.hoangnh.io.vn",
    category: "personal",
    reverse: true,
  },
  {
    title: "3D Wheel Generator for 1:64 Diecast",
    description:
      "Browser-based parametric wheel generator for diecast hobbyists: describe a wheel through a Zod-validated form (diameter, spoke style, bearing holes, print tolerances) or upload a reference image, and a dual-provider LLM integration (Claude / Gemini, BYOK) writes OpenSCAD code that compiles to print-ready STL entirely in the browser via OpenSCAD WASM. Live Three.js / react-three-fiber preview with orbit controls and wireframe toggle, STL upload with automatic dimension detection for text-instruction editing, and a CodeMirror viewer for the generated code.",
    tech: ["Next.js 16", "TypeScript", "OpenSCAD WASM", "Three.js / R3F", "Claude & Gemini API", "Zustand", "CodeMirror"],
    githubUrl: "https://github.com/huyhoang0805",
    liveUrl: "https://wheel-forge-two.vercel.app",
    category: "personal",
    reverse: false,
  },
];
