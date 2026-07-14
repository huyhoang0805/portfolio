"use client";
import { motion } from "framer-motion";
import { WorkCard } from "./WorkCard";
import { SECTION_HEADINGS, WORK_EXPERIENCE } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

export function WorkExperience() {
  return (
    <motion.section
      className="py-14"
      variants={staggerContainer(0.12)}
      {...inViewProps}
    >
      <motion.h2
        className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-foreground mb-10"
        variants={fadeUp}
      >
        {SECTION_HEADINGS.experience.title}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WORK_EXPERIENCE.map((card, i) => (
          <WorkCard key={i} {...card} />
        ))}
      </div>
    </motion.section>
  );
}
