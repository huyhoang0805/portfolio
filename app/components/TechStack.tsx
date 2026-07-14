"use client";
import { motion } from "framer-motion";
import { TECH_ROW1, TECH_ROW2, TECH_BLURB } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

export function TechStack() {
  const tools = [...TECH_ROW1, ...TECH_ROW2];

  return (
    <motion.section
      className="py-20 px-6"
      variants={staggerContainer(0.12)}
      {...inViewProps}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p variants={fadeUp} className="text-lg text-foreground/85 max-w-lg">
          {TECH_BLURB.line1}{" "}
          <span className="text-primary font-semibold">{TECH_BLURB.highlight}</span>{" "}
          {TECH_BLURB.line2}
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm text-muted-foreground mt-2">
          {TECH_BLURB.sub}
        </motion.p>

        <motion.ul variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
          {tools.map((tool) => (
            <li
              key={tool.label}
              className="font-mono text-xs px-3 py-1.5 rounded-md border border-(--border-color) text-foreground/75 hover:border-primary/40 hover:text-foreground transition-colors duration-200"
            >
              {tool.label}
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
