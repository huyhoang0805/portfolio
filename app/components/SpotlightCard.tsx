"use client";
import { useRef } from "react";

export interface SpotlightCardProps {
  className?: string;
  children: React.ReactNode;
}

/** Card có vệt sáng accent bám theo con trỏ (CSS ở globals: .spotlight-card) */
export function SpotlightCard({ className = "", children }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}
