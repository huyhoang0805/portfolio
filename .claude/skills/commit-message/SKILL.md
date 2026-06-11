---
name: commit-message
description: Sinh commit message theo Conventional Commits từ diff đã stage. Dùng khi user nói "viết commit message", "commit message", hoặc sau khi hoàn thành một thay đổi cần commit.
allowed-tools: Bash, Read
user-invocable: true
---

# commit-message

1. Chạy `git diff --staged --stat` và `git diff --staged` để xem thay đổi. Nếu chưa stage gì, xem `git status` và hỏi user muốn commit phần nào.
2. Soạn message theo Conventional Commits:
   - `feat:` tính năng mới · `fix:` sửa bug · `refactor:` · `style:` · `docs:` · `chore:`
   - Subject ≤ 72 ký tự, imperative mood, không chấm cuối câu.
   - Body (nếu cần): giải thích **why**, không liệt kê lại diff.
3. Chỉ IN RA message cho user review — KHÔNG tự chạy `git commit` (user tự commit).
