# Research: Redesign Portfolio v2 — chống "AI-gen look"

> Tổng hợp từ deep-research (multi-agent, có kiểm chứng chéo nguồn), 2026-07-06.
> Mục tiêu: dark theme + 1 accent neon blue, trông handcrafted, audience = recruiter/hiring manager FE.

## 1. "Tells" của AI-gen look — và bài học quan trọng nhất

**Nguồn mạnh nhất — chính Anthropic cookbook** ([prompting for frontend aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)) liệt kê các default mà AI hội tụ về khi không được chỉ đạo:
- Font quá phổ biến: Inter, Roboto, Arial, system fonts
- Purple gradient làm aesthetic mặc định
- Hierarchy nhàm: weight 400 vs 600, size nhảy 1.5x

Tactic chống lại (cùng nguồn, đã verify 3-0):
- **Font pairing tương phản cao**: display + monospace, serif + geometric sans
- **Weight cực đoan**: 100/200 đối chọi 800/900 — không phải 400 vs 600
- **Size jump ≥ 3x** giữa các cấp heading, không phải 1.5x

Nguồn phụ (blog practitioner, độ tin thấp hơn — dùng làm heuristic): combo "Space Grotesk / Instrument Serif / Geist" bị nhận diện là vibe-coded; dark mode với body text xám trung bình contrast sát nút; glow/box-shadow màu rải khắp nơi; card nào cũng cùng padding/radius/height.

**Bài học quan trọng nhất (verify lật ngược định kiến):** [brittanychiang.com](https://brittanychiang.com/) — portfolio dark-theme kinh điển, được fork nhiều nhất — dùng **chính font Inter** cho toàn trang. Kết luận: font mặc định không phải thứ giết chết design; thứ tạo cảm giác handcrafted là **layout + mật độ nội dung thật + số liệu đo được**. Đừng đổ hết ngân sách vào font, đổ vào content và structure.

## 2. Phân tích reference

### brittanychiang.com — học về CONTENT
- Project có **số liệu định lượng**: "100k+ Installs", "6k+ stars, 3k+ forks" — recruiter hấp thụ trong vài giây.
- **Colophon** ở footer: "Loosely designed in Figma and coded in VS Code by yours truly. Built with Next.js and Tailwind CSS" — tín hiệu handcrafted mà trang AI-gen không bao giờ có.

### moncy.dev — học về HERO, nhưng không phải cái ta tưởng
- Palette: nền near-black `#050405` + **1 họ accent duy nhất** (`--accentColor: #c2a4ff`, violet) + text off-white `#eae5ec`. Đúng mô hình mình theo đuổi, chỉ khác hue.
- Typography: display font có cá tính (ClashDisplay) cho heading, sans thường cho body.
- **Insight từ vòng verify (quan trọng):** khoảnh khắc nhớ-trong-30-giây của moncy.dev là `initialFX` — choreographed **text reveal thuần CSS/GSAP, ZERO WebGL**. Phần 3D character chỉ là chunk lazy-load phía sau. → Hero moment gây ấn tượng KHÔNG cần three.js — đúng với perf budget của mình.

### React Bits (reactbits.dev)
- 130+ component, mỗi cái 4 biến thể (JS/TS × CSS/Tailwind). Lưu ý: biến thể CSS/TW ≠ không WebGL — một số background component vẫn dùng WebGL, phải chọn lọc. Dùng tham khảo ý tưởng text-animation/micro-interaction, không clone làm điểm nhấn chính.

## 3. Motion & performance (nguồn: motion.dev, web.dev, webkit.org)

- `MotionConfig reducedMotion="user"` (motion.dev): tự tắt transform/layout animation theo OS setting, giữ opacity/backgroundColor — đặt 1 lần ở root.
- Hook `useReducedMotion` cho case tùy biến từng component.
- Chỉ animate **transform / opacity / filter** — animation đụng layout phá Web Vitals (web.dev).
- **Font tùy chỉnh có thể block text render tới 3s** (Chromium/Firefox) → bắt buộc `next/font` (tự preload + `font-display`), nếu không LCP < 2.5s phá sản ngay từ font (web.dev).
- Scroll animation lớn phải nằm sau media query reduced-motion (webkit.org).

## 4. Case-study format cho recruiter (đọc lướt 30–60s)

Theo pattern Brittany Chiang + nguyên tắc quantified-proof:
- Mỗi project: **1 dòng vấn đề → 1-2 dòng giải pháp (nêu tech thật) → 1 dòng kết quả CÓ SỐ** (users, % perf, thời gian tiết kiệm, quy mô data).
- Số đặt trước, chữ đặt sau. Tối đa 3-4 bullet, không đoạn văn.
- Link demo/repo ngay cạnh — recruiter không đào tìm.

## 5. Khuyến nghị chốt cho portfolio này

### Palette (near-black + 1 accent neon blue, WCAG AA trên nền)
| Token | Hex | Vai trò | Contrast trên `#050507` |
|---|---|---|---|
| `--bg` | `#050507` | nền chính | — |
| `--surface` | `#0b0c12` | card/section nổi | — |
| `--text` | `#e8eaf2` | body text (off-white, không trắng thuần) | ~17:1 AAA |
| `--muted` | `#8f96a8` | text phụ | ~6.5:1 AA |
| `--accent` | `#3fa9ff` | neon/electric blue — link, số liệu, điểm nhấn | ~7:1 AA |
| `--accent-bright` | `#7cc4ff` | hover / heatmap cấp cao | ~10:1 AAA |
- Đúng 3 vai trò màu (nền/chữ/accent). Glow neon chỉ xuất hiện **1 nơi**: hero moment. Không glow rải khắp trang (tell AI-gen).
- Border chuẩn: `rgba(63,169,255,0.14)`.

### Typography (Google Fonts, free, qua next/font)
- **Display — Bricolage Grotesque** (variable): cá tính, không nằm trong combo bị nhận diện AI-gen, hỗ trợ weight cực đoan. Heading dùng 800, sub dùng 200 — đúng tactic contrast cực đoan.
- **Body — Inter**: đã được chứng minh không phải vấn đề (brittanychiang.com); dễ đọc, đã quen thuộc trong repo.
- **Mono — JetBrains Mono**: cho toàn bộ phần GitLab data, số liệu, label kỹ thuật — display+mono là pairing được cookbook khuyến nghị, và mono hoá phần data làm nó trông như dashboard thật.
- Size jump ≥ 3x giữa hero headline và body.

### Section plan (thứ tự trang)
1. **Hero** — headline display 800 cực to + text-reveal choreography (kiểu initialFX, thuần CSS/framer-motion, không WebGL) + 1 dòng mono live-stat từ GitLab ("N commits · 30 ngày qua") làm hook không-thể-prompt-ra.
2. **Proof of Work** (nâng GitLab lên vị trí #2) — heatmap + activity, style dashboard/terminal, toàn bộ chữ số dùng JetBrains Mono.
3. **Featured Projects** — mini case-study: vấn đề → giải pháp → kết quả có số.
4. **Experience + Tech stack** — gộp gọn, timeline compact.
5. **Contact + Footer colophon** — "Designed & built by me. Next.js · Tailwind v4 · data sync từ self-hosted GitLab CI."

### Motion plan
- Root: `MotionConfig reducedMotion="user"`.
- **1 hero moment duy nhất**: staggered text mask-reveal + 1 lần accent sweep (transform/opacity only).
- Micro-interactions: card hover (border sáng lên + translate 2px), heatmap cell fade-in một lần, scroll-reveal chỉ opacity + translateY 8px.
- Bỏ stagger-fadeUp toàn trang của v1. Không animation nào đụng layout property.

## Nguồn chính
- https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
- https://brittanychiang.com/
- https://www.moncy.dev/ (bundle inspection)
- https://motion.dev/docs/react-accessibility
- https://web.dev/articles/css-web-vitals
- https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- https://reactbits.dev/
