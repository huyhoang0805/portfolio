"use client";
import { motion } from "framer-motion";
import { PERSONAL } from "../data/content";
import { fadeUp, staggerContainer, springScale } from "../lib/motion";

const STATS = [
  { value: "3+", label: "Apps Shipped" },
  { value: "3+", label: "Years Coding" },
  { value: "600+", label: "Commits" },
  { value: "200+", label: "Releases" },
];

const chipPositions = [
  "-top-2 -left-14",
  "top-4 -right-16",
  "bottom-4 -left-16",
  "-bottom-2 -right-14",
];
const chipFloatY = [-12, -16, -10, -14];
const chipDelays = [0.4, 0.55, 0.65, 0.75];

export function Hero() {
  const { name, heroTagline, heroHeadline, heroHighlight, heroCaption, availableForWork } =
    PERSONAL;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      {/* ── Background blobs ── */}
      <motion.div
        className="blob absolute w-[600px] h-[600px] opacity-[0.18] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          background: "radial-gradient(circle, rgba(3,232,252,0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-15%",
          left: "-8%",
        }}
      />
      <motion.div
        className="blob-2 absolute w-[450px] h-[450px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        style={{
          background: "radial-gradient(circle, rgba(0,151,168,0.7) 0%, transparent 70%)",
          filter: "blur(90px)",
          bottom: "0%",
          right: "-5%",
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(3,232,252,0.5) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* ── Top radial glow ── */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% -5%, rgba(3,232,252,0.1) 0%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24 px-4">

        {/* Left: Text */}
        <motion.div
          className="flex flex-col gap-5 text-center md:text-left max-w-lg"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="visible"
        >
          {/* Hello badge */}
          <motion.div className="flex justify-center md:justify-start" variants={fadeUp}>
            <span
              className="glass inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{ color: "#9ff5ff" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Hello! I Am{" "}
              <span className="font-semibold" style={{ color: "#03e8fc" }}>
                {name}
              </span>
            </span>
          </motion.div>

          {/* Tagline + headline */}
          <motion.div variants={fadeUp}>
            <p className="text-base mb-2" style={{ color: "#6b7a99" }}>
              {heroTagline}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] text-white">
              {heroHeadline[0]}
              <br />
              {heroHeadline[1]}{" "}
              <motion.span
                className="relative inline-block"
                style={{ color: "#03e8fc" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {heroHighlight}
                <motion.span
                  className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #03e8fc, #0097a8)",
                    boxShadow: "0 0 12px rgba(3,232,252,0.8)",
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.span>
              <span style={{ color: "#03e8fc" }}>...</span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-sm"
            style={{ color: "#6b7a99", maxWidth: "420px" }}
          >
            {heroCaption}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="flex gap-3 justify-center md:justify-start"
          >
            <motion.a
              href="#contact"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #03e8fc, #0097a8)",
                color: "#07091a",
                boxShadow: "0 4px 24px rgba(3,232,252,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(3,232,252,0.6)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Let&apos;s Connect
            </motion.a>
            <motion.a
              href="#projects"
              className="glass px-6 py-2.5 rounded-xl text-sm font-semibold"
              style={{ color: "#c0cce0" }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.07)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              See My Work
            </motion.a>
            <motion.a
              href={PERSONAL.cvUrl}
              download
              className="glass px-6 py-2.5 rounded-xl text-sm font-semibold"
              style={{ color: "#9ff5ff", border: "1px solid rgba(3,232,252,0.25)" }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(3,232,252,0.08)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              ↓ CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Avatar + floating chips */}
        <div className="relative shrink-0 w-72 h-72 flex items-center justify-center">

          {/* Ambient ring */}
          <motion.div
            className="absolute w-64 h-64 rounded-full pointer-events-none"
            style={{
              border: "1px solid rgba(3,232,252,0.12)",
              boxShadow: "0 0 60px rgba(3,232,252,0.08) inset",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Avatar */}
          <motion.div
            className="w-48 h-48 rounded-full flex items-center justify-center text-7xl"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, #0097a8 0%, #003a4d 50%, #07091a 100%)",
              boxShadow:
                "0 0 60px rgba(3,232,252,0.5), 0 0 120px rgba(3,232,252,0.18), inset 0 0 30px rgba(3,232,252,0.15)",
              border: "1px solid rgba(3,232,252,0.35)",
            }}
            variants={springScale}
            initial="hidden"
            animate="visible"
            animate-delay={0.2}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            🧑‍💻
          </motion.div>

          {/* Available badge */}
          {availableForWork && (
            <motion.div
              className="glass absolute -top-3 right-4 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5"
              style={{ color: "#9ff5ff" }}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 18 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              Available
            </motion.div>
          )}

          {/* Floating stat chips */}
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`glass-strong absolute ${chipPositions[i]} px-3 py-2 rounded-xl text-center min-w-[76px]`}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, chipFloatY[i], 0],
              }}
              transition={{
                opacity: { delay: chipDelays[i], duration: 0.5 },
                scale: { delay: chipDelays[i], duration: 0.5, type: "spring", stiffness: 280, damping: 16 },
                y: {
                  delay: chipDelays[i] + 0.5,
                  duration: 4 + i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror",
                },
              }}
            >
              <p className="text-lg font-bold leading-none" style={{ color: "#03e8fc" }}>
                {stat.value}
              </p>
              <p className="text-[10px] mt-1 leading-tight" style={{ color: "#6b7a99" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
