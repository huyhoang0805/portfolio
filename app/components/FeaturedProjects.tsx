"use client";
import { motion } from "framer-motion";
import {
  FEATURED_PROJECTS,
  SECTION_HEADINGS,
  type Project,
} from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href === "#") return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover-underline font-mono text-xs text-accent-bright hover:text-primary transition-colors duration-200"
    >
      {children} ↗
    </a>
  );
}

function CaseStudyRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      className="group border-t border-(--border-color) py-10 grid md:grid-cols-[56px_1fr] gap-x-6 gap-y-3"
    >
      {/* Số thứ tự mono — nhịp editorial */}
      <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300 pt-2 hidden md:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex gap-5">
            <ExternalLink href={project.liveUrl}>live</ExternalLink>
            <ExternalLink href={project.githubUrl}>source</ExternalLink>
          </div>
        </div>

        {/* Problem → Solution */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-5 max-w-4xl">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              problem
            </p>
            <p className="text-sm leading-relaxed text-foreground/75">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
              built
            </p>
            <p className="text-sm leading-relaxed text-foreground/75">{project.solution}</p>
          </div>
        </div>

        {/* Outcomes — số trước, chữ sau */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 font-mono">
          {project.outcomes.map((o) => (
            <p key={o.label} className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">{o.value}</span>
              <span className="text-[11px] text-muted-foreground">{o.label}</span>
            </p>
          ))}
        </div>

        <p className="font-mono text-[11px] text-muted-foreground/80">
          {project.tech.join(" · ")}
        </p>
      </div>
    </motion.article>
  );
}

function ProjectGroup({
  heading,
  projects,
  startIndex,
}: {
  heading: { title: string; sub: string };
  projects: Project[];
  startIndex: number;
}) {
  return (
    <motion.div variants={staggerContainer(0.12)} {...inViewProps}>
      <motion.div variants={fadeUp} className="mb-8">
        <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-foreground">
          {heading.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-3">{heading.sub}</p>
      </motion.div>
      {projects.map((project, i) => (
        <CaseStudyRow key={project.title} project={project} index={startIndex + i} />
      ))}
    </motion.div>
  );
}

export function FeaturedProjects() {
  const company = FEATURED_PROJECTS.filter((p) => p.category === "company");
  const personal = FEATURED_PROJECTS.filter((p) => p.category === "personal");

  return (
    <section id="projects" className="py-14 flex flex-col gap-24">
      <ProjectGroup
        heading={SECTION_HEADINGS.companyProjects}
        projects={company}
        startIndex={0}
      />
      <ProjectGroup
        heading={SECTION_HEADINGS.personalProjects}
        projects={personal}
        startIndex={company.length}
      />
    </section>
  );
}
