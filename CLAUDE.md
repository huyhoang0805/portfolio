# Portfolio — Nguyễn Văn Hoàng

Portfolio cá nhân. Stack: Next.js (App Router) + React + TypeScript + Tailwind v4 + framer-motion.
Data động lấy từ GitLab self-hosted của công ty (heatmap, recent pushes, projects). FE engineer: 1 người.

## Lệnh thường dùng
- Dev:       `pnpm dev`
- Build:     `pnpm build`
- Lint:      `pnpm lint`
- Typecheck: `pnpm typecheck`
- Sync GitLab (Plan B, chạy trong CI): `pnpm sync`

## Layout
- `app/`                  → routes (App Router, Server Components mặc định)
- `app/data/content.ts`   → ★ TOÀN BỘ nội dung text của portfolio — sửa content tại đây, không hardcode trong component
- `app/components/`       → section components (Hero, About, FeaturedProjects… — phần lớn là client vì framer-motion)
- `components/ui/`        → shadcn primitives; `components/kibo-ui/` → contribution graph
- `lib/gitlab/`           → GitLab client + aggregation + sanitization (server-only, KHÔNG import vào client)
- `public/cv/`            → file CV cho nút Download
- `scripts/sync-stats.mjs`→ Plan B: chạy trong GitLab CI nội bộ, commit data/gitlab-summary.json

## Luôn tuân thủ
- TypeScript strict; KHÔNG dùng `any`, ưu tiên `unknown` + narrowing.
- Component mặc định là Server Component; chỉ thêm `"use client"` khi cần state/event/framer-motion.
- `GITLAB_TOKEN` chỉ tồn tại server-side (`lib/gitlab/` có `import "server-only"`) — không bao giờ để lộ ra client bundle.
- Data GitLab phải qua sanitization: project ngoài allowlist chỉ hiện "private project", không lộ tên/branch/commit message công ty.
- Theme: dark navy + blue (#07091a nền, accent #3d8bff → #2563eb) — giữ đúng palette, không đổi sang theme khác.
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
