# Rule: UI Components

- 1 component / file, PascalCase, file trùng tên component, đặt trong `app/components/` (section) hoặc `components/ui/` (primitive).
- **Theme theo Design Brief v2 trong CLAUDE.md** (near-black + 1 accent neon blue + neutrals, đúng 3 vai trò màu). Token màu định nghĩa tập trung ở `app/globals.css` (Tailwind `@theme`) — component KHÔNG hardcode hex rải rác trong JSX/inline style.
- Tuân thủ danh sách anti-patterns trong brief (blob blur + dot grid, glassmorphism tràn lan, multi-color gradient, clone component copy-paste library…).
- Animation dùng framer-motion với variants chung từ `app/lib/motion.ts` — motion system làm lại theo brief (1 hero moment + micro-interactions tinh), không tự chế easing mới mỗi nơi một kiểu, và phải respect `prefers-reduced-motion`.
- Section tĩnh (không state/event/animation) phải là Server Component — không thêm `"use client"` theo quán tính.
- Mọi text hiển thị lấy từ `app/data/content.ts` — KHÔNG hardcode tên, bio, mô tả project trong JSX.
- Component nhận data động (GitLab) phải xử lý empty state (mảng rỗng → return null hoặc placeholder).
- A11y: link icon có `aria-label`, ưu tiên semantic HTML.
