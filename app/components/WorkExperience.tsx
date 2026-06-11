"use client";
import { motion } from "framer-motion";
import { WorkCard } from "./WorkCard";
import { WORK_EXPERIENCE } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

export function WorkExperience() {
  return (
    <motion.section
      className="py-10"
      variants={staggerContainer(0.12)}
      {...inViewProps}
    >
      <motion.div
        className="flex items-center gap-3 mb-8"
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-white">Work Experience</h2>
        <motion.div
          className="flex-1 h-px"
          style={{ background: "linear-gradient(90deg, rgba(3,232,252,0.3), transparent)" }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WORK_EXPERIENCE.map((card, i) => (
          <WorkCard key={i} {...card} />
        ))}
      </div>
    </motion.section>
  );
}
