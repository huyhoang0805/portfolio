"use client";
import { motion } from "framer-motion";
import {
  HERO_LIVE_STAT,
  HERO_STATS,
  HERO_STATUS,
  PERSONAL,
} from "../data/content";
import { EASE_OUT_EXPO, fadeUp, maskLine, staggerContainer } from "../lib/motion";
import { CountUp } from "./CountUp";
import { HeroBackground } from "./HeroBackground";
import { Magnetic } from "./Magnetic";
import type { GitlabSummary } from "@/lib/gitlab/types";

export interface HeroProps {
  /** Totals từ GitLab summary — null/0 commits → fallback stat tĩnh */
  totals: GitlabSummary["totals"] | null;
}

/** Bọc từng dòng headline trong overflow-hidden để chạy mask reveal */
function RevealLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
      <motion.span className="block" variants={maskLine}>
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ totals }: HeroProps) {
  const { heroTagline, heroHeadline, heroHighlight, heroCaption, availableForWork } =
    PERSONAL;

  const live = totals !== null && totals.commitsLastYear > 0;
  const liveStats = live
    ? [
        { to: totals.commitsLastYear, label: HERO_LIVE_STAT.commits },
        { to: totals.activeDays, label: HERO_LIVE_STAT.activeDays },
        { to: totals.currentStreak, label: HERO_LIVE_STAT.streak },
      ]
    : null;

  return (
    <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
      {/* Background hero — DotGrid (desktop) / SideRays (mobile), full-bleed */}
      <HeroBackground />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start"
        variants={staggerContainer(0.14, 0.1)}
        initial="hidden"
        animate="visible"
      >
        {/* Status line — mono */}
        {availableForWork && (
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-wider text-muted-foreground mb-8"
          >
            <span className="text-primary">●</span> {HERO_STATUS.openToWork} ·{" "}
            {HERO_STATUS.location}
          </motion.p>
        )}

        {/* Tagline — display siêu mảnh, đối chọi headline 800 */}
        <RevealLine>
          <span className="font-display font-extralight text-xl md:text-2xl text-muted-foreground tracking-wide">
            {heroTagline}
          </span>
        </RevealLine>

        {/* Headline — display 800, size jump ~4x so với tagline */}
        <h1 className="font-display font-extrabold tracking-tight leading-[0.95] text-[clamp(3.4rem,9vw,7.5rem)] text-foreground mt-3">
          <RevealLine>{heroHeadline[0]}</RevealLine>
          <RevealLine>
            {heroHeadline[1]}{" "}
            <span className="relative inline-block text-primary">
              {heroHighlight}
              <motion.span
                aria-hidden
                className="absolute left-0 right-0 bottom-[0.02em] h-[0.045em] rounded-full bg-primary"
                style={{ boxShadow: "0 0 18px rgba(63,169,255,0.7)" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.05, duration: 0.7, ease: EASE_OUT_EXPO }}
              />
            </span>
            .
          </RevealLine>
        </h1>

        {/* Caption */}
        <motion.p
          variants={fadeUp}
          className="text-base text-muted-foreground max-w-xl mt-7 leading-relaxed"
        >
          {heroCaption}
        </motion.p>

        {/* CTA — magnetic hover */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-9">
          <Magnetic>
            <a
              href="#projects"
              className="inline-block px-6 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground"
            >
              See my work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={PERSONAL.cvUrl}
              download
              className="inline-block px-6 py-3 rounded-lg text-sm font-semibold text-accent-bright border border-(--border-color) transition-colors duration-200 hover:bg-(--bg-card)"
            >
              Download CV
            </a>
          </Magnetic>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Contact →
          </a>
        </motion.div>

        {/* Stat strip — mono, data thật từ GitLab khi có (count-up) */}
        <motion.dl
          variants={fadeUp}
          className="flex flex-wrap gap-x-10 gap-y-4 mt-14 font-mono"
        >
          {liveStats
            ? liveStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-primary leading-none">
                    <CountUp to={stat.to} />
                  </dd>
                  <dd className="text-[11px] text-muted-foreground mt-1.5 tracking-wide">
                    {stat.label}
                  </dd>
                </div>
              ))
            : HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-primary leading-none">
                    {stat.value}
                  </dd>
                  <dd className="text-[11px] text-muted-foreground mt-1.5 tracking-wide">
                    {stat.label}
                  </dd>
                </div>
              ))}
          {live && (
            <div className="self-end">
              <dd className="text-[11px] text-muted-foreground tracking-wide">
                <span className="text-primary">↗</span> {HERO_LIVE_STAT.source}
              </dd>
            </div>
          )}
        </motion.dl>
      </motion.div>
    </section>
  );
}
