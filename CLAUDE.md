# Portfolio — Nguyễn Huy Hoàng

Portfolio cá nhân. Stack: Next.js (App Router) + React + TypeScript + Tailwind v4 + framer-motion.
Data động lấy từ GitLab self-hosted của công ty (heatmap, recent pushes, projects). FE engineer: 1 người.

> **Trạng thái: đang REDESIGN v2.** Giao diện v1 bị đánh giá "AI-gen look" — đang làm lại theo Design Brief bên dưới. Mọi thay đổi UI mới phải bám brief này, không bám theme cũ.

## Lệnh thường dùng
- Dev:       `pnpm dev`
- Build:     `pnpm build`
- Lint:      `pnpm lint`
- Typecheck: `pnpm typecheck`
- Sync GitLab (Plan B, chạy trong CI): `pnpm sync`

## Layout
- `app/`                  → routes (App Router, Server Components mặc định)
- `app/data/content.ts`   → ★ TOÀN BỘ nội dung text của portfolio — sửa content tại đây, không hardcode trong component
- `app/components/`       → section components (Hero, About, FeaturedProjects…)
- `components/ui/`        → shadcn primitives; `components/kibo-ui/` → contribution graph
- `lib/gitlab/`           → GitLab client + aggregation + sanitization (server-only, KHÔNG import vào client)
- `public/cv/`            → file CV cho nút Download
- `scripts/sync-stats.mjs`→ Plan B: chạy trong GitLab CI nội bộ, commit data/gitlab-summary.json

## Design Brief v2 (nguồn sự thật cho redesign)

### Mục tiêu & audience
- Người xem chính: **tech recruiter + hiring manager FE** — đọc lướt 30–60 giây. Không phải Awwwards.
- Sau 30 giây họ phải nhớ được: "FE engineer 3 năm, code thật đang chạy — có bằng chứng sống (GitLab data), trang nhanh và tinh".

### Signature (thứ không thể prompt ra được)
1. **GitLab live data** (heatmap, activity, projects thật) — nâng từ section phụ lên điểm nhấn trung tâm của trang.
2. **Nội dung có chiều sâu**: mỗi featured project là mini case-study (vấn đề → giải pháp → kết quả đo được), không phải card 3 dòng.

### Màu sắc — tối giản, 1 accent duy nhất (đã chốt, xem docs/DESIGN_RESEARCH.md)
- Token: `--bg #050507` · `--surface #0b0c12` · `--text #e8eaf2` · `--muted #8f96a8` · `--accent #3fa9ff` (neon blue) · `--accent-bright #7cc4ff` · border `rgba(63,169,255,0.14)`. Tất cả đạt WCAG AA trên nền.
- KHÔNG thêm màu accent thứ hai (không gradient tím, không cyan-magenta). Muốn nhấn mạnh → dùng độ sáng/độ đậm của chính blue. Glow neon chỉ ở 1 nơi: hero.
- Token màu định nghĩa tập trung trong `app/globals.css` (Tailwind v4 `@theme`) — component không hardcode hex rải rác.

### Typography (đã chốt)
- **Display: Bricolage Grotesque** (variable, next/font) — heading weight 800 đối chọi sub weight 200, size jump ≥ 3x.
- **Body: Inter** (đã chứng minh không phải vấn đề — brittanychiang.com dùng Inter; identity nằm ở display + mono).
- **Mono: JetBrains Mono** — toàn bộ GitLab data, số liệu, label kỹ thuật.
- Font load qua `next/font` (preload + display swap) để không phá LCP.

### Motion — "vừa đủ, bắt mắt, để lại ấn tượng"
- **Hero moment**: text mask-reveal + background React Bits lazy-load (next/dynamic ssr:false), switch tại Hero.tsx. Hiện dùng `DotGrid` (canvas 2D + gsap InertiaPlugin); `SideRays` (WebGL/ogl — ngoại lệ WebGL duy nhất) giữ làm phương án thay thế. Cả hai đã thêm reduced-motion. Hero đặt NGOÀI Container, content tự bọc max-w-7xl bên trong. Không thêm WebGL ở chỗ nào khác.
- Micro-interactions: `SpotlightCard` (glow theo con trỏ), `Magnetic` (CTA hút chuột), `CountUp` (stats), `.hover-underline`. Dùng lại các component này, không tự chế bản mới.
- KHÔNG stagger-fadeUp mọi section như v1. Không WebGL/3D runtime chỉ để làm background.
- Bắt buộc respect `prefers-reduced-motion` (StrandsBackground vẽ tĩnh, CountUp hiện thẳng, Magnetic tắt).

### Performance budget (cứng)
- LCP < 2.5s trên mobile tầm trung, không thêm dependency 3D.
- Redesign phải **giảm** số client component so với v1 (v1: 11/15 là client) — section tĩnh trả về Server Component.

### Anti-patterns — cấm vì đây là dấu hiệu AI-gen look
- ❌ Radial blob blur + dot grid background combo
- ❌ Glassmorphism badge/card tràn lan
- ❌ Purple/multi-color gradient
- ❌ Copy nguyên component từ thư viện copy-paste (reactbits…) làm điểm nhấn chính — tham khảo ý tưởng thì được, clone thì không.

## Luôn tuân thủ
- TypeScript strict; KHÔNG dùng `any`, ưu tiên `unknown` + narrowing.
- Component mặc định là Server Component; chỉ thêm `"use client"` khi cần state/event/framer-motion.
- `GITLAB_TOKEN` chỉ tồn tại server-side (`lib/gitlab/` có `import "server-only"`) — không bao giờ để lộ ra client bundle.
- Data GitLab phải qua sanitization: project ngoài allowlist chỉ hiện "private project", không lộ tên/branch/commit message công ty.
- Nội dung hiển thị (tên, bio, experience, projects) phải khớp CV trong `public/cv/`.

## Quy tắc chi tiết (import khi liên quan)
- Next.js App Router: @.claude/rules/nextjs-app-router.md
- TypeScript:         @.claude/rules/typescript.md
- UI components:      @.claude/rules/components-ui.md
- GitLab data:        @.claude/rules/gitlab-data.md

## Đừng làm
- Đừng tự ý đổi cấu trúc thư mục hay nâng major dependency mà không hỏi.
- Đừng commit; mình tự review rồi commit.
- Đừng thêm env var mới mà không cập nhật `.env.example`.
