"use client";
import { motion } from "framer-motion";
import { useTyping } from "../hooks/useTyping";
import { useMounted } from "../hooks/useMounted";
import { PERSONAL } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

export function About() {
  const { roles, currentRole, currentCompany, bio } = PERSONAL;
  const typed = useTyping(roles);
  const mounted = useMounted();

  return (
    <motion.section
      id="about"
      className="py-20"
      variants={staggerContainer(0.15)}
      {...inViewProps}
    >
      <motion.h2
        className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-foreground flex items-center gap-1 mb-4"
        variants={fadeUp}
      >
        I&apos;m a {mounted ? typed : roles[0]}
        <span className="cursor" />
      </motion.h2>

      <motion.p
        className="font-mono text-xs text-muted-foreground mb-8"
        variants={fadeUp}
      >
        currently {currentRole} @{" "}
        <a
          href={currentCompany.url}
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:text-accent-bright transition-colors duration-200"
        >
          {currentCompany.name}
        </a>
      </motion.p>

      <motion.p
        className="text-base leading-relaxed whitespace-pre-line text-foreground/75 max-w-2xl"
        variants={fadeUp}
      >
        {bio}
      </motion.p>
    </motion.section>
  );
}
