"use client";
import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { springScale, fadeIn, inViewProps } from "../lib/motion";

export function BrandOrbit() {
  return (
    <motion.section
      className="relative py-28 flex items-center justify-center overflow-hidden"
      variants={fadeIn}
      {...inViewProps}
    >
      {/* Background radial glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(3,232,252,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Outer static ring */}
        <motion.div
          className="absolute w-72 h-72 rounded-full"
          style={{ border: "1px solid rgba(3,232,252,0.07)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Middle ring — reverse spin */}
        <motion.div
          className="absolute w-56 h-56 rounded-full spin-reverse"
          style={{
            border: "1px dashed rgba(3,232,252,0.12)",
            borderRightColor: "rgba(3,232,252,0.4)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Inner ring — slow spin */}
        <motion.div
          className="absolute w-44 h-44 rounded-full spin-slow"
          style={{
            border: "1px solid rgba(3,232,252,0.18)",
            borderTopColor: "rgba(3,232,252,0.7)",
            borderRightColor: "rgba(3,232,252,0.35)",
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Center glass orb */}
        <motion.div
          className="relative z-10 pulse-glow rounded-full w-28 h-28 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 30%, #0097a8 0%, #003a4d 50%, #07091a 100%)",
            border: "1px solid rgba(3,232,252,0.3)",
            boxShadow:
              "0 0 40px rgba(3,232,252,0.4), 0 0 80px rgba(3,232,252,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          variants={springScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.08 }}
        >
          <LogoMark size={44} />
        </motion.div>

        {/* Orbiting dot on inner ring */}
        <div className="absolute w-44 h-44 rounded-full spin-slow pointer-events-none">
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full -top-1.5 left-1/2 -translate-x-1/2"
            style={{
              background: "#03e8fc",
              boxShadow: "0 0 10px rgba(3,232,252,0.9), 0 0 20px rgba(3,232,252,0.5)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 14 }}
          />
        </div>

        {/* Orbiting dot on reverse ring */}
        <div className="absolute w-56 h-56 rounded-full spin-reverse pointer-events-none">
          <motion.div
            className="absolute w-2 h-2 rounded-full -right-1 top-1/2 -translate-y-1/2"
            style={{
              background: "#7ff5ff",
              boxShadow: "0 0 8px rgba(127,245,255,0.9)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.85, type: "spring", stiffness: 300, damping: 14 }}
          />
        </div>
      </div>
    </motion.section>
  );
}
