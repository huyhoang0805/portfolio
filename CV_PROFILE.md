# CV Profile — Nguyễn Huy Hoàng

> Bản tổng hợp mới nhất (2026-06) để sửa lại CV. Mọi mô tả dự án dưới đây đã được
> đối chiếu với **code thật** trong các repo trên máy (AhaFood, Franchise-portal,
> hoc-n3, my-service, AI-wheels) — không còn nội dung template sai như CV cũ.
> Phần `[CẦN ĐIỀN]` là số liệu chỉ bạn mới biết.

---

## 1. Thông tin liên hệ

| | |
|---|---|
| Họ tên | **Nguyễn Huy Hoàng** |
| Ngày sinh | 08/05/2002 |
| Địa điểm | Ho Chi Minh City, Vietnam |
| Phone | 0962790160 |
| Email | nh88099@gmail.com |
| GitHub | https://github.com/huyhoang0805 |
| Facebook | https://www.facebook.com/nh88099/ |
| LinkedIn | `[CẦN ĐIỀN — link dạng linkedin.com/in/<slug>, link /feed không dùng được trong CV]` |
| Portfolio | `[CẦN ĐIỀN — domain sau khi deploy repo Portfolio]` |

---

## 2. Summary (gợi ý cho CV)

> Software Engineer with nearly 3 years of experience building production-grade web
> applications with React, Next.js, and TypeScript. Sole owner of the entire frontend
> for AhaFood.ai — a food e-commerce platform embedded in the Ahamove super-app —
> and builder of AI Agent integration for the Franchise Portal (AI menu-extraction
> streaming over SSE). Experienced in AI-assisted development workflows: directing AI
> coding agents (Claude Code) with curated context, modular rules, and review skills
> to ship feature-level work with PR-quality output.

---

## 3. Technical Skills

**Languages**
TypeScript · JavaScript (ES6+) · HTML5 · CSS3 · SQL

**Frontend frameworks & libraries**
React 18/19 · Next.js 14–16 (App Router, Route Handlers, ISR) · TanStack Start (SSR via Nitro) · TanStack Router · TanStack Query v5 · Zustand · React Hook Form + Zod · Tailwind CSS v3/v4 · shadcn/ui + Radix UI · Framer Motion · @dnd-kit · next-intl (i18n) · react-konva

**AI / LLM integration**
Vercel AI SDK v5 (real-time streaming chat) · Anthropic Claude API · Google Gemini API · AI agent integration qua SSE (Server-Sent Events) · BYOK pattern · Claude Code workflows (CLAUDE.md configuration, modular rules, custom agent skills, code-review skill)

**Backend & Data**
Next.js Route Handlers · BFF pattern (TanStack Start `createServerFn`) · RESTful APIs · Drizzle ORM · Neon PostgreSQL (serverless) · Clerk auth · OIDC OAuth 2.0 + OTP flows · HttpOnly-cookie sessions · RBAC (permission matrix) · CASL · Cloudinary (signed uploads) · Telegram Bot API · Resend · LocationIQ geocoding + Haversine

**3D / Graphics**
Three.js · react-three-fiber · OpenSCAD WASM (in-browser CAD compile)

**Analytics & Observability**
Google Analytics 4 (tracking audit, audience segments, webview attribution debugging) · Google Tag Manager · Sentry

**Testing**
Vitest · Playwright (E2E) · React Testing Library

**Tooling & Infra**
Turborepo · pnpm · Vite · Git · GitLab CI · Vercel · GCP Cloud Run · Figma

---

## 4. Professional Experience — Ahamove (HCMC)

**Software Engineer** · `[CẦN ĐIỀN: tháng/năm bắt đầu]` – Present

### 4.1. AhaFood.ai — Food E-commerce Platform (ahafood.ai) · *sole frontend owner*

- Own toàn bộ frontend của AhaFood.ai: **Turborepo monorepo** gồm 2 app Next.js 15
  (customer storefront + merchant dashboard) và 3 shared packages
  (`@ahafood/ui`, `@ahafood/common-i18n`, `@ahafood/icons`); chạy dưới dạng webview
  nhúng trong Ahamove super-app, phục vụ `[CẦN ĐIỀN: X merchants / X đơn/ngày]`.
- Xây **AI chat ordering**: hội thoại đặt món streaming real-time qua
  **Vercel AI SDK v5** (`TextStreamChatTransport`), tích hợp recommendation API
  gợi ý món theo vị trí & khách hàng.
- Triển khai **OIDC OAuth 2.0** federated authentication (accounts Ahamove) +
  OTP verification, token refresh/sync giữa SSR và CSR.
- Dẫn dắt **GA4 product analytics**: audit toàn bộ tracking, dựng audience segment
  theo thành phố, chẩn đoán lỗi undercount trong webview do `history.replaceState`
  xoá param `?webinapp` trước khi GA4 fire — khôi phục attribution in-app chính xác.
- Xây tool **batch chỉnh sửa ảnh món ăn** cho merchant bằng react-konva
  (drag/resize/rotate, flow xử lý 2 bước local-then-AI), giảm
  `[CẦN ĐIỀN: X%]` thời gian chuẩn bị ảnh.
- Thiết kế authorization dùng chung FE/BE với **CASL**, serialize permission rules
  sang JSON, server-side enforcement là single source of truth.
- Merchant dashboard: quản lý menu **drag-and-drop (@dnd-kit)**, data table
  (TanStack Table), đa ngôn ngữ **next-intl**; observability với **Sentry**;
  test bằng **Vitest + Playwright**.

### 4.2. Franchise Portal — AI Merchant Onboarding (fc.ahamove.com)

- Xây portal quản lý franchise **đa vai trò** (admin / partner / merchant) trên
  **TanStack Start** (React 19, SSR qua **Nitro**), deploy **GCP Cloud Run**.
- Tích hợp **AI Agent cho merchant onboarding**: merchant upload ảnh menu →
  AI extraction agent đọc món & giá → kết quả **stream live qua SSE** vào scanning
  UI (kèm image compression client-side, timeout handling 90s); flow phụ
  **crawl menu từ URL** các nền tảng food (Shopee, Facebook…).
- Dựng **BFF layer type-safe** bằng `createServerFn` — mọi call API Ahamove đi qua
  server functions, token nằm trong **HttpOnly cookies** (OTP-based login,
  refresh token rotation), không lộ ra client.
- Thiết kế **RBAC package** (`@ahafood/rbac`) với permission matrix chi tiết
  (7 roles × 8 modules) áp dụng cho route guard + UI.

### 4.3. AI-Assisted Engineering Workflow (cross-team)

- Thiết lập quy trình làm việc với AI coding agents cho team: **CLAUDE.md** project
  configuration, **modular coding rules**, **custom agent skills** (gồm skill
  code-review quan trọng) — ship feature & bugfix qua AI agent với output chất lượng
  PR, có review đầy đủ.

---

## 5. Personal Projects (đều đã deploy / chạy được)

### 5.1. Japanese Learning App — hoc-n3 · https://hoc-n3.vercel.app
*React 18 · TypeScript · Vite · TanStack Router · Zustand · Radix UI · Tailwind*

- Web app luyện thi JLPT, **static SPA hoàn toàn không backend** — toàn bộ nội dung
  đóng gói dạng JSON datasets tự curate:
  **125 mẫu ngữ pháp** (N5: 30, N4: 35, N3: 60) + **375 câu quiz**,
  **628 kanji** chia 38 nhóm bộ thủ, **2.692 từ vựng** đủ 50 bài Minna no Nihongo,
  8 bài đọc hiểu, **10 đề thi thử** chuẩn JLPT.
- Tự viết **furigana renderer** (token-based, render `<ruby><rt>`) với toggle toàn cục;
  flashcard + quiz modes; progress tracking lưu localStorage qua Zustand persist.

### 5.2. Personal Services Monorepo — my-service · https://canman.hoangnh.io.vn
*Turborepo · Next.js 14 · Neon PostgreSQL ×2 · Drizzle ORM · Clerk ×2 · Cloudinary*

- Monorepo Turborepo + pnpm chạy **3 services** trên 2 database Neon Postgres tách biệt:
  - **Calibration booking** (canman.hoangnh.io.vn): đặt lịch cân màu màn hình với
    **dynamic pricing theo khoảng cách** (Haversine + LocationIQ geocoding),
    admin panel điều khiển qua **Telegram bot** (/confirm, /done, /cancel…),
    ICS calendar feed cho iPhone, Excel export, và **Claude API content drafting**
    (human-in-the-loop, structured outputs cho FB post / SEO post).
  - **Marketplace**: sàn resale/repair đồ công nghệ — CRUD listings, gallery ảnh
    **Cloudinary signed uploads**, bảng giá sửa chữa + form ước tính.
  - **Sansale**: Shopee affiliate link converter — unshorten + normalize URL
    (SSRF-safe), dedup, rate-limit theo IP-hash, click tracking redirect,
    dashboard cashback ledger (pending → confirmed → paid) + analytics 6 tháng.
- Shared packages: `@repo/db`, `@repo/notify` (Telegram + Resend), `@repo/ui`.

### 5.3. 3D Wheel Generator (wheel-forge) — cho dân chơi diecast 1:64
*Next.js 16 · TypeScript · OpenSCAD WASM · Three.js / react-three-fiber · Claude & Gemini API*

- Generator mâm xe parametric chạy **hoàn toàn trong browser**: nhập thông số qua
  form Zod-validated (đường kính, spoke style, lỗ bearing, dung sai máy in resin/FDM)
  hoặc upload ảnh tham khảo → **LLM (Claude / Gemini, dual-provider BYOK)** sinh
  code OpenSCAD → compile sang **STL in-browser qua OpenSCAD WASM** (không cần cài
  phần mềm CAD).
- **Edit mode**: upload STL có sẵn → tự động detect kích thước (OD, width, bearing
  hole qua radial clustering) → mô tả thay đổi bằng text → regenerate.
- Preview 3D live (orbit controls, wireframe, before/after compare), CodeMirror viewer
  cho code sinh ra, 5 preset (Five-Spoke, Turbine, Mesh, Dish, Deep Dish).
- `[CẦN ĐIỀN: link deploy nếu có]`

### 5.4. Portfolio site (repo này)
*Next.js 16 · Tailwind v4 · framer-motion · GitLab API*

- Portfolio với **GitLab activity tự cập nhật** (heatmap, recent pushes, stats) từ
  GitLab self-hosted công ty — data layer server-only 3 chế độ (api / static qua
  CI sync / demo), sanitization ẩn danh project private; ISR 6h.

---

## 6. Education

**University of Information Technology (UIT) — VNU-HCM**
Trường Đại học Công nghệ Thông tin — ĐHQG TP.HCM · Khoá 2020
*(chưa tốt nghiệp — trong CV chỉ ghi tên trường + khoá, không ghi bằng cấp)*

---

## 7. Languages

| Ngôn ngữ | Trình độ |
|---|---|
| Vietnamese | Native |
| English | Cơ bản — giao tiếp + đọc/viết tiếng Anh chuyên ngành |
| Japanese | JLPT N4 |

---

## 8. Checklist khi sửa CV

- [ ] Đổi tên file & header CV thành **Nguyen Huy Hoang** (file cũ ghi "Nguyen Van Hoang")
- [ ] Điền các mục `[CẦN ĐIỀN]`: tháng/năm vào Ahamove, số merchant/đơn, % giảm thời gian, LinkedIn /in/, domain portfolio
- [ ] **Xoá mô tả sai từ template cũ**: hoc-n3 KHÔNG dùng Next.js/Drizzle/PostgreSQL/Anthropic API (thực tế: static React + Vite SPA); my-service KHÔNG dùng UploadThing (thực tế: Cloudinary)
- [ ] Mục "Testing" cũ ghi Jest — các repo thực tế dùng **Vitest** + Playwright
- [ ] Sau khi CV mới xong: thay file trong `public/cv/` rồi chạy `/update-cv-content` để đồng bộ portfolio
