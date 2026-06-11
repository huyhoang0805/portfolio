---
name: update-cv-content
description: Đồng bộ nội dung portfolio (app/data/content.ts) từ file CV trong public/cv/. Dùng khi user nói "cập nhật CV", "sync CV", "update content from CV", hoặc sau khi thay file CV mới.
allowed-tools: Read, Write, Edit, Bash, Grep
argument-hint: [đường-dẫn-file-CV-mới]
user-invocable: true
---

# update-cv-content

Đồng bộ một chiều: CV (.docx) → `app/data/content.ts`. CV là source of truth cho nội dung.

## Quy trình
1. Nếu argument là file CV mới: copy vào `public/cv/` (giữ tên dạng `Nguyen_Van_Hoang_CV.docx`), cập nhật `PERSONAL.cvUrl` nếu tên đổi.
2. Extract text từ docx: `textutil -convert txt -stdout <file.docx>` (macOS).
3. So sánh với `app/data/content.ts` hiện tại, cập nhật các phần:
   - `PERSONAL` — name, bio (từ SUMMARY), currentRole, heroCaption.
   - `WORK_EXPERIENCE` — từ PROFESSIONAL EXPERIENCE (mỗi highlight lớn = 1 entry, có emoji).
   - `FEATURED_PROJECTS` — từ PERSONAL PROJECTS + project công ty nổi bật.
   - `TECH_ROW1/2` — từ TECHNICAL SKILLS (chỉ đưa tech có icon trong react-icons Simple Icons).
4. Giữ nguyên: theme, NAV_LINKS, TECH_BLURB, các field placeholder có `// TODO` mà CV cũng để placeholder (vd `[your.email@gmail.com]` → không ghi đè email thật đang có).
5. KHÔNG copy nguyên văn placeholder trong CV (text trong `[ngoặc vuông]`) vào content — bỏ qua hoặc giữ giá trị cũ.
6. Chạy `pnpm typecheck`, báo lại diff tóm tắt những gì đã đổi.
