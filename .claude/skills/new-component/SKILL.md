---
name: new-component
description: Tạo React component mới đúng convention portfolio (Server Component mặc định, theme dark cyan, content từ content.ts, props typed). Dùng khi user nói "tạo component", "new component", "scaffold a UI component".
allowed-tools: Read, Write, Grep, Glob, Bash
argument-hint: <ComponentName> [section|ui]
user-invocable: true
---

# new-component

Khi được gọi, tạo component theo các bước:

1. Hỏi (hoặc lấy từ argument) tên component + loại: `section` → `app/components/`, `ui` → `components/ui/`.
2. Đọc 1–2 component cùng loại có sẵn để khớp style (vd `app/components/GitlabActivity.tsx` cho server, `app/components/Hero.tsx` cho client + framer-motion).
3. Tạo file `<Name>.tsx`:
   - Mặc định Server Component; chỉ thêm `"use client"` nếu cần state/event/framer-motion.
   - Khai báo `interface <Name>Props` rõ ràng.
   - Theme: dùng đúng palette dark cyan (xem `.claude/rules/components-ui.md`).
   - Text hiển thị lấy từ `app/data/content.ts` — nếu cần content mới, thêm vào đó trước.
   - Nếu nhận data động (GitLab) → xử lý empty state.
4. Animation (nếu client component): dùng variants từ `app/lib/motion.ts`.
5. Chạy `pnpm typecheck` để xác nhận không lỗi type.
