"use client";
import { motion } from "framer-motion";

export function TechIcon({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <motion.div
      title={label}
      className="flex items-center justify-center w-10 h-10 rounded-full text-xl"
      style={{ background: color, boxShadow: `0 0 12px ${color}88` }}
      whileHover={{
        scale: 1.2,
        boxShadow: `0 0 24px ${color}cc, 0 0 48px ${color}44`,
        rotate: [0, -8, 8, 0],
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 14,
        // rotate đi qua 4 keyframes — spring chỉ hỗ trợ 2, phải dùng tween
        rotate: { type: "tween", duration: 0.45, ease: "easeInOut" },
      }}
    >
      {icon}
    </motion.div>
  );
}
