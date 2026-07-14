"use client";
import { motion } from "framer-motion";
import { PERSONAL, SECTION_HEADINGS, SOCIALS } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

export function Contact() {
  const { email, phone, contactBlurb } = PERSONAL;

  return (
    <motion.section
      id="contact"
      className="py-28"
      variants={staggerContainer(0.12)}
      {...inViewProps}
    >
      <motion.h2
        variants={fadeUp}
        className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-foreground"
      >
        {SECTION_HEADINGS.contact.title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="text-base leading-relaxed whitespace-pre-line text-foreground/75 max-w-xl mt-5"
      >
        {contactBlurb}
      </motion.p>

      {/* Email — link lớn nhất trang, hành động chính */}
      <motion.div variants={fadeUp} className="mt-10">
        <a
          href={`mailto:${email}`}
          className="font-mono text-xl md:text-3xl font-bold text-primary hover:text-accent-bright transition-colors duration-200 break-all"
        >
          {email}
        </a>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap gap-x-8 gap-y-2 mt-8 font-mono text-xs"
      >
        <a
          href={`tel:${phone}`}
          className="hover-underline text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {phone}
        </a>
        {SOCIALS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className="hover-underline text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {label.toLowerCase()} ↗
          </a>
        ))}
      </motion.div>
    </motion.section>
  );
}
