"use client";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

export interface MagneticProps {
  children: React.ReactNode;
  /** Độ hút 0–1 (mặc định 0.25 — vừa đủ cảm nhận, không giật) */
  strength?: number;
  className?: string;
}

/** Wrapper làm phần tử "hút" nhẹ theo con trỏ khi hover, nhả về bằng spring */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.5 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (reduced || !el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
