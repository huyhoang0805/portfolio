"use client";
import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";
import { SpotlightCard } from "./SpotlightCard";

export interface WorkCardProps {
  emoji: string;
  title: string;
  desc: string;
  link?: string;
}

export function WorkCard({ emoji, title, desc, link = "#" }: WorkCardProps) {
  return (
    <motion.div variants={fadeUp} className="h-full">
      <SpotlightCard className="h-full rounded-xl p-6 flex flex-col gap-4 border border-(--border-color) bg-(--bg-card) transition-colors duration-300 hover:border-primary/35">
        <h3 className="text-foreground font-semibold text-sm leading-snug">
          <span className="mr-2" aria-hidden>
            {emoji}
          </span>
          {title}
        </h3>

        <p className="text-sm leading-relaxed flex-1 text-muted-foreground">{desc}</p>

        {link !== "#" && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-accent-bright hover:text-primary transition-colors duration-200 self-start"
          >
            view →
          </a>
        )}
      </SpotlightCard>
    </motion.div>
  );
}
