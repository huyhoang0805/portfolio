# Rule: UI Components

- 1 component / file, PascalCase, file trùng tên component, đặt trong `app/components/` (section) hoặc `components/ui/` (primitive).
- Theme cố định: nền `#07091a` / `#070b1a`, accent blue `#3d8bff` → `#2563eb`, tint sáng `#b3d4ff`, text phụ `#9090a8` / `#6b7a99`.
  Card style chuẩn: `background: rgba(61,139,255,0.06)`, `border: 1px solid rgba(61,139,255,0.15)`.
- Animation dùng framer-motion với variants chung từ `app/lib/motion.ts` (`fadeUp`, `staggerContainer`, `springScale`) — không tự chế easing mới mỗi nơi một kiểu.
- Mọi text hiển thị lấy từ `app/data/content.ts` — KHÔNG hardcode tên, bio, mô tả project trong JSX.
- Component nhận data động (GitLab) phải xử lý empty state (mảng rỗng → return null hoặc placeholder).
- A11y: link icon có `aria-label`, ưu tiên semantic HTML.
