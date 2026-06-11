"use client";
import { motion } from "framer-motion";
import { useTyping } from "../hooks/useTyping";
import { useMounted } from "../hooks/useMounted";
import { PERSONAL } from "../data/content";
import { fadeUp, slideLeft, staggerContainer, inViewProps } from "../lib/motion";

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
        className="text-4xl font-bold mb-3 text-white flex items-center gap-1"
        variants={slideLeft}
      >
        I&apos;m a {mounted ? typed : roles[0]}
        <span className="cursor" />
      </motion.h2>

      <motion.p
        className="text-sm mb-6"
        style={{ color: "#6b7a99" }}
        variants={fadeUp}
      >
        Currently, I&apos;m a {currentRole} at{" "}
        <a
          href={currentCompany.url}
          className="font-semibold hover:underline"
          style={{ color: "#1877f2" }}
        >
          {currentCompany.emoji} {currentCompany.name}
        </a>
      </motion.p>

      <motion.p
        className="text-base leading-relaxed whitespace-pre-line"
        style={{ color: "#8a9bb5", maxWidth: "560px" }}
        variants={fadeUp}
      >
        {bio}
      </motion.p>
    </motion.section>
  );
}
