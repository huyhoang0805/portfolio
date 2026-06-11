# Rule: GitLab Data Layer

- Entry point duy nhất: `getGitlabSummary()` trong `lib/gitlab/index.ts`. Mọi nơi cần data GitLab gọi hàm này — không fetch GitLab API trực tiếp ở chỗ khác.
- 3 mode qua `GITLAB_DATA_MODE`: `api` (gọi trực tiếp), `static` (đọc `data/gitlab-summary.json` do CI sync), `auto` (api → static → demo). Code mới phải hoạt động với cả 3 mode.
- **Privacy là bất biến:** project ngoài allowlist (`GITLAB_PUBLIC_PROJECTS`) chỉ được hiện "private project" — không lộ tên, branch, commit message, URL của công ty. Khi thêm field mới vào summary, tự hỏi: field này có lộ thông tin nội bộ không?
- `lib/gitlab/index.ts` có `import "server-only"` — không import từ client component; truyền data qua props.
- `scripts/sync-stats.mjs` (Plan B) phải giữ logic aggregation/sanitization đồng bộ với `lib/gitlab/index.ts` — sửa một bên thì kiểm tra bên kia.
- Token scope chỉ `read_api`. Không bao giờ ghi token vào file, log, hay error message.
