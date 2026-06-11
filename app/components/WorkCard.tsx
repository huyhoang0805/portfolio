"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export function WorkCard({
  emoji,
  title,
  desc,
  link = "#",
}: {
  emoji: string;
  title: string;
  desc: string;
  link?: string;
}) {
  return (
    <motion.div
      className="shimmer-card rounded-2xl p-5 flex flex-col gap-4"
      variants={fadeUp}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 48px rgba(3,232,252,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
        borderColor: "rgba(3,232,252,0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Icon + title */}
      <div className="flex items-start gap-4">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{
            background: "linear-gradient(135deg, #003a4d, #0097a8)",
            boxShadow: "0 4px 20px rgba(3,232,252,0.35)",
          }}
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 16 }}
        >
          {emoji}
        </motion.div>
        <h3 className="text-white font-semibold text-sm leading-snug pt-1">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b7a99" }}>
        {desc}
      </p>

      {/* Link */}
      <motion.a
        href={link}
        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase self-start group"
        style={{ color: "#03e8fc" }}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        Learn More
        <svg
          className="w-3 h-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </motion.div>
  );
}
