"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL } from "../data/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // raw scroll value → motion value for smooth spring
  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, { stiffness: 180, damping: 28, mass: 0.6 });

  // width: 860px → 620px
  const maxWidth = useTransform(smoothScrollY, [0, 100], [900, 620]);
  // padding X: 2rem → 1.25rem
  const paddingX = useTransform(smoothScrollY, [0, 100], [28, 18]);
  // marginTop: 0 → 12px (tạo hiệu ứng float xuống khi scroll)
  const marginTop = useTransform(smoothScrollY, [0, 100], [4, 14]);
  // background opacity
  const bgOpacity = useTransform(smoothScrollY, [0, 80], [0.55, 0.88]);
  // border opacity
  const borderOpacity = useTransform(smoothScrollY, [0, 80], [0.07, 0.14]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollY.set(y);
      setScrolled(y > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        style={{
          maxWidth,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          marginTop,
          borderRadius: 9999,
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
        }}
        className="w-full flex items-center justify-between py-3"
      >
        {/* Glass background layer */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: useTransform(
              bgOpacity,
              (v) => `rgba(10, 12, 28, ${v})`
            ),
            border: useTransform(
              borderOpacity,
              (v) => `1px solid rgba(255,255,255,${v})`
            ),
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        />

        {/* Cyan top-edge glow (appears on scroll) */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              className="absolute top-0 left-[15%] right-[15%] h-px rounded-full pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(3,232,252,0.6) 40%, rgba(3,232,252,0.6) 60%, transparent)",
              }}
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>

        {/* ── Logo / Name ── */}
        <a href="#" className="relative z-10 shrink-0">
          <motion.span
            className="font-bold tracking-widest text-sm uppercase"
            style={{ color: "#ffffff" }}
            whileHover={{ color: "#03e8fc" }}
            transition={{ duration: 0.2 }}
          >
            {PERSONAL.name.split(" ").slice(-2).join(" ")}
          </motion.span>
        </a>

        {/* ── Nav links ── */}
        <div className="relative z-10 hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              className="text-xs font-semibold tracking-widest uppercase relative group"
              style={{ color: "#8a9bb5" }}
              whileHover={{ color: "#ffffff" }}
              transition={{ duration: 0.15 }}
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full"
                style={{ background: "#03e8fc", boxShadow: "0 0 6px rgba(3,232,252,0.8)" }}
              />
            </motion.a>
          ))}
        </div>

        {/* ── CTA Button ── */}
        <motion.a
          href="#contact"
          className="relative z-10 shrink-0 px-5 py-2 rounded-full text-xs font-semibold tracking-wide"
          style={{
            background: "linear-gradient(135deg, #03e8fc, #0097a8)",
            color: "#07091a",
            boxShadow: "0 2px 16px rgba(3,232,252,0.4)",
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 4px 24px rgba(3,232,252,0.65)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          Hire Me
        </motion.a>
      </motion.nav>
    </div>
  );
}
