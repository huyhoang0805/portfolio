import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion variants & helpers
 */

/** Cubic-bezier dùng chung — tuple để khớp type Easing của framer-motion */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// ── Fade up (dùng cho text blocks, sections) ───────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

// ── Fade in (simple opacity) ────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Slide from left ─────────────────────────────────────────
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

// ── Slide from right ────────────────────────────────────────
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

// ── Scale in (cards, mockups) ───────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

// ── Container: staggered children ──────────────────────────
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

// ── Spring scale (for avatar, orbit center) ────────────────
export const springScale: Variants = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.1 },
  },
};

// ── Mask reveal (hero headline — bọc ngoài bằng span overflow-hidden) ──
export const maskLine: Variants = {
  hidden:  { y: "115%" },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
};

// ── Common whileInView props ───────────────────────────────
export const inViewProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
} as const;
