# Rule: TypeScript

- Strict mode; KHÔNG dùng `any`. Dữ liệu ngoài (API response, JSON file) nhận vào là `unknown` rồi narrow, hoặc khai type rõ như `lib/gitlab/types.ts`.
- Props của component khai báo qua `interface XxxProps` hoặc `type`, export nếu component được tái sử dụng.
- Type dùng chung cho GitLab data đặt ở `lib/gitlab/types.ts` — không định nghĩa lại shape ở nơi khác.
- Nội dung text (content) khai báo trong `app/data/content.ts` với `as const` khi cần literal type.
- Sau khi sửa code, chạy `pnpm typecheck` để xác nhận không lỗi type.
