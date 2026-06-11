"use client";
import { motion, type Variants } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma } from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer,
  SiReactquery, SiZod,
  SiTurborepo, SiVitest, SiSentry, SiGitlab,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";

import { TechIcon } from "./TechIcon";
import { TECH_ROW1, TECH_ROW2, TECH_BLURB } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

// Text badge cho icon không có trong simple-icons
function TextBadge({ text }: { text: string }) {
  return <span className="text-[11px] font-bold text-white leading-none">{text}</span>;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  FaReact:           <FaReact />,
  FaNodeJs:          <FaNodeJs />,
  FaPython:          <FaPython />,
  FaGitAlt:          <FaGitAlt />,
  FaFigma:           <FaFigma />,
  SiTypescript:      <SiTypescript />,
  SiNextdotjs:       <SiNextdotjs />,
  SiTailwindcss:     <SiTailwindcss />,
  SiFramer:          <SiFramer />,
  SiReactquery:      <SiReactquery />,
  SiZod:             <SiZod />,
  SiZustand:         <TextBadge text="Zu" />,      // no simple-icon
  SiDrizzle:         <TextBadge text="Dz" />,      // no simple-icon
  SiTanstack:        <TextBadge text="TSt" />,     // no simple-icon
  SiPostgresql:      <BiLogoPostgresql />,
  SiTurborepo:       <SiTurborepo />,
  SiVitest:          <SiVitest />,
  SiPlaywright:      <TextBadge text="PW" />,      // no simple-icon
  SiSentry:          <SiSentry />,
  SiGitlab:          <SiGitlab />,
  BiLogoPostgresql:  <BiLogoPostgresql />,
};

const iconVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.5, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

function IconRow({ items, delayChildren }: { items: typeof TECH_ROW1; delayChildren: number }) {
  return (
    <motion.div
      className="flex gap-3 flex-wrap justify-center"
      variants={staggerContainer(0.07, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {items.map((t) => (
        <motion.div key={t.label} variants={iconVariant}>
          <TechIcon label={t.label} color={t.color} icon={ICON_MAP[t.icon]} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function TechStack() {
  return (
    <motion.section
      className="py-20 px-6 text-center"
      variants={staggerContainer(0.15)}
      {...inViewProps}
    >
      <motion.p
        className="text-base mb-1 max-w-lg mx-auto"
        style={{ color: "#c0c0d8" }}
        variants={fadeUp}
      >
        {TECH_BLURB.line1}{" "}
        <span
          className="font-semibold"
          style={{ color: "#03e8fc", borderBottom: "2px solid #0097a8", paddingBottom: "1px" }}
        >
          {TECH_BLURB.highlight}
        </span>{" "}
        {TECH_BLURB.line2}
      </motion.p>

      <motion.p
        className="text-sm mb-10"
        style={{ color: "#6b7a99" }}
        variants={fadeUp}
      >
        {TECH_BLURB.sub}
      </motion.p>

      <div className="flex flex-col gap-3 items-center">
        <IconRow items={TECH_ROW1} delayChildren={0} />
        <IconRow items={TECH_ROW2} delayChildren={0.05} />
      </div>
    </motion.section>
  );
}
