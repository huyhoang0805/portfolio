# Portfolio — Nguyễn Văn Hoàng

Portfolio cá nhân (Next.js App Router + Tailwind v4 + framer-motion) hợp nhất từ 2 project:

- **Design & UI** — từ `my-portfolio`: hero animation, tech stack marquee, featured projects, contribution graph (kibo-ui), dark cyan theme.
- **GitLab data layer** — từ `gitlab-portfolio`: contribution heatmap, recent pushes và project list **tự cập nhật từ GitLab self-hosted của công ty**, có sanitization (project private chỉ đếm ẩn danh).
- **CV** — `public/cv/Nguyen_Van_Hoang_CV.docx`, nút Download ở Hero và trang About. Nội dung CV được đồng bộ vào `app/data/content.ts`.

## Chạy local

```bash
pnpm install
pnpm dev   # chưa có env → tự render demo data để xem giao diện
```

## GitLab data — vì sao có 2 plan?

GitLab công ty thường nằm sau VPN/firewall → server của Vercel **không gọi vào được**.
Test nhanh: mở `https://gitlab.your-company.com/api/v4/version` từ 4G (không VPN).
Mở được → Plan A. Không mở được → Plan B.

### Plan A — GitLab truy cập được từ internet

1. Tạo Personal Access Token trên GitLab công ty: scope `read_api` (chỉ đọc, KHÔNG cấp `api`).
2. `cp .env.example .env.local`, điền `GITLAB_BASE_URL`, `GITLAB_TOKEN`, `GITLAB_USERNAME`.
3. Trên Vercel, khai báo đúng các env vars đó (Project → Settings → Environment Variables).
4. Đặt `GITLAB_DATA_MODE=api`. Trang được ISR-cache 6 giờ (`revalidate = 21600`).

Token chỉ tồn tại server-side trong `lib/gitlab/` (có `import "server-only"`) —
client không bao giờ nhìn thấy.

### Plan B — GitLab chỉ trong mạng nội bộ

Pipeline GitLab CI chạy **bên trong công ty** sẽ gọi API nội bộ, tổng hợp số liệu đã ẩn danh,
rồi commit `data/gitlab-summary.json` sang repo portfolio này → Vercel tự redeploy.

1. Tạo một repo nhỏ trên GitLab công ty (vd: `portfolio-stats-sync`) chứa
   `scripts/sync-stats.mjs` + `.gitlab-ci.yml` (xem `.gitlab-ci.example.yml`).
2. Khai báo CI Variables (Masked): `GITLAB_BASE_URL`, `GITLAB_TOKEN`, `GITLAB_USERNAME`,
   `GITLAB_PUBLIC_PROJECTS`, `PORTFOLIO_REPO_URL`.
3. CI/CD → Schedules → `0 */6 * * *`.
4. Repo portfolio đặt `GITLAB_DATA_MODE=static`.

> ⚠️ Kiểm tra policy công ty trước khi chạy CI job đụng tới dữ liệu nội bộ. Script đã được
> thiết kế để **không** đưa tên project, branch hay commit message của công ty ra ngoài
> (trừ project bạn chủ động thêm vào allowlist) — chỉ có số commit theo ngày.

## Privacy model

- `GITLAB_PUBLIC_PROJECTS` là allowlist theo `path_with_namespace`. Project trong list
  (hoặc visibility `public`) hiện tên thật + mô tả + link.
- Mọi project khác: gom thành "+N private projects", recent push hiện "private project".
- Heatmap chỉ chứa `{date, count}` — không có thông tin gì khác.

## Cấu trúc

```
app/
  page.tsx                    # trang chủ: Hero, About, WorkExperience, TechStack, Projects, Contact
  about/page.tsx              # trang About: bio, GitLab stats/heatmap/recent activity (server, ISR 6h)
  data/content.ts             # ★ toàn bộ nội dung text — đồng bộ từ CV
  components/                 # UI sections (framer-motion)
  api/contributions/route.ts  # {total, byDate} cho contribution graph
  api/gitlab/summary/route.ts # full GitLab summary JSON (debug / widgets)
components/
  kibo-ui/contribution-graph/ # heatmap component
  ui/                         # shadcn primitives
lib/gitlab/                   # ★ GitLab client + aggregation + sanitization (server-only)
scripts/sync-stats.mjs        # Plan B: chạy trong GitLab CI nội bộ
data/gitlab-summary.json      # output của Plan B (commit vào repo)
public/cv/                    # file CV (nút Download ở Hero + About)
```

## Claude Code setup

Repo đã cấu hình sẵn theo chuẩn nội bộ (xem `CLAUDE.md`):

- `CLAUDE.md` — project memory (lệnh, layout, quy ước)
- `.claude/rules/` — quy tắc modular: Next.js App Router, TypeScript, components, GitLab data
- `.claude/skills/` — `/new-component`, `/grill-me`, `/update-cv-content`, `/commit-message`
- `.claude/settings.json` — permissions (allow lệnh an toàn, deny thao tác nguy hiểm)

## Việc cần làm sau khi clone

- [ ] Điền link GitHub/LinkedIn thật trong `app/data/content.ts` (đang là TODO)
- [ ] Chọn Plan A hay B, điền env
- [ ] Thêm project cá nhân vào `GITLAB_PUBLIC_PROJECTS`
- [ ] Cập nhật CV mới → thay file trong `public/cv/` rồi chạy `/update-cv-content`
