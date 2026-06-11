# Rule: Next.js App Router

- Server Component là mặc định. Chỉ `"use client"` khi cần state, event handler, browser API, hoặc framer-motion.
- Data fetching đặt ở Server Component / Route Handler — không fetch trong `useEffect` nếu tránh được.
  (Ví dụ chuẩn trong repo: `app/about/page.tsx` gọi `getGitlabSummary()` server-side rồi truyền props xuống client components.)
- Trang/route dùng data GitLab phải khai `export const revalidate = 21600` (ISR 6 giờ) — không gọi GitLab API mỗi request.
- Route Handler đặt tại `app/api/<name>/route.ts`, trả `NextResponse.json()`.
- Secret (`GITLAB_TOKEN`…) chỉ đọc qua `process.env` trong code server-side; module nào đụng tới secret phải có `import "server-only"` ở đầu file.
- Link nội bộ dùng `next/link`; ảnh dùng `next/image`.
