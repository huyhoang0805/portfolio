"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProjectMockup } from "./ProjectMockup";
import { FEATURED_PROJECTS, type Project } from "../data/content";
import { fadeUp, slideLeft, slideRight, scaleIn, staggerContainer, inViewProps } from "../lib/motion";

function ProjectCard({ title, description, tech, githubUrl, liveUrl, reverse }: Project) {
  const textBlock = (
    <motion.div
      className="flex flex-col gap-4 flex-1"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div variants={fadeUp}>
        <Badge variant="tech" className="self-start tracking-widest uppercase text-xs">
          Featured Project
        </Badge>
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-white"
        variants={reverse ? slideRight : slideLeft}
      >
        {title}
      </motion.h3>

      <motion.div
        className="text-sm leading-relaxed p-4 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          color: "#8a9bb5",
        }}
        variants={fadeUp}
      >
        {description}
      </motion.div>

      <motion.div className="flex gap-2 flex-wrap" variants={fadeUp}>
        {tech.map((t) => (
          <Badge key={t} variant="tech" className="text-xs">
            {t}
          </Badge>
        ))}
      </motion.div>

      <motion.div className="flex gap-3 mt-1 items-center" variants={fadeUp}>
        <motion.a
          href={githubUrl}
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#8a9bb5",
          }}
          whileHover={{ scale: 1.15, color: "#3d8bff", borderColor: "rgba(61,139,255,0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </motion.a>
        <motion.a
          href={liveUrl}
          aria-label="Live demo"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold"
          style={{
            background: "linear-gradient(135deg, rgba(61,139,255,0.15), rgba(37,99,235,0.1))",
            border: "1px solid rgba(61,139,255,0.25)",
            color: "#3d8bff",
            boxShadow: "0 2px 12px rgba(61,139,255,0.15)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(61,139,255,0.35)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Live Demo
        </motion.a>
      </motion.div>
    </motion.div>
  );

  const mockupBlock = (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <ProjectMockup />
    </motion.div>
  );

  return (
    <div
      className={`flex flex-col md:flex-row gap-10 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {reverse ? <>{mockupBlock}{textBlock}</> : <>{textBlock}{mockupBlock}</>}
    </div>
  );
}

function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        {sub ? (
          <p className="text-sm mt-1" style={{ color: "#6b7a99" }}>
            {sub}
          </p>
        ) : null}
      </div>
      <motion.div
        className="flex-1 h-px self-center"
        style={{ background: "linear-gradient(90deg, rgba(61,139,255,0.3), transparent)" }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function FeaturedProjects() {
  const company = FEATURED_PROJECTS.filter((p) => p.category === "company");
  const personal = FEATURED_PROJECTS.filter((p) => p.category === "personal");

  return (
    <section id="projects" className="py-10 flex flex-col gap-24">
      <SectionHeading
        title="Company Projects"
        sub="Production products I build at Ahamove"
      />
      <div className="flex flex-col gap-24">
        {company.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <SectionHeading
        title="Personal Projects"
        sub="Side projects — designed, built and deployed end-to-end"
      />
      <div className="flex flex-col gap-24">
        {personal.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
