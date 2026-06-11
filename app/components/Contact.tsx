"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { PERSONAL, SOCIALS } from "../data/content";
import { fadeUp, staggerContainer, inViewProps } from "../lib/motion";

const ICON_MAP = {
  instagram: <FaInstagram size={18} />,
  github:    <FaGithub size={18} />,
  linkedin:  <FaLinkedin size={18} />,
  facebook:  <FaFacebook size={18} />,
};

export function Contact() {
  const { email, phone, contactBlurb } = PERSONAL;

  return (
    <motion.section
      id="contact"
      className="py-24 relative"
      variants={staggerContainer(0.12)}
      {...inViewProps}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(3,232,252,0.6) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative z-10 max-w-xl">
        <motion.div className="flex items-center gap-3 mb-6" variants={fadeUp}>
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          <motion.div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(90deg, rgba(3,232,252,0.3), transparent)" }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="shimmer-card rounded-2xl p-6 flex flex-col gap-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
          variants={fadeUp}
          whileHover={{
            boxShadow: "0 12px 48px rgba(3,232,252,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#8a9bb5" }}>
            {contactBlurb}
          </p>

          {/* Email pill */}
          <motion.a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-xl text-sm font-medium"
            style={{
              background: "rgba(3,232,252,0.07)",
              border: "1px solid rgba(3,232,252,0.2)",
              color: "#03e8fc",
              boxShadow: "0 2px 12px rgba(3,232,252,0.12)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(3,232,252,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 7L2 7" />
            </svg>
            {email}
          </motion.a>

          {/* Phone pill */}
          <motion.a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-xl text-sm font-medium"
            style={{
              background: "rgba(3,232,252,0.07)",
              border: "1px solid rgba(3,232,252,0.2)",
              color: "#03e8fc",
              boxShadow: "0 2px 12px rgba(3,232,252,0.12)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(3,232,252,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {phone}
          </motion.a>

          {/* Social icons */}
          <motion.div
            className="flex gap-2 pt-1"
            variants={staggerContainer(0.08)}
          >
            {SOCIALS.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "#8a9bb5",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
                variants={fadeUp}
                whileHover={{
                  scale: 1.15,
                  color: "#03e8fc",
                  borderColor: "rgba(3,232,252,0.4)",
                  boxShadow: "0 4px 16px rgba(3,232,252,0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                {ICON_MAP[icon as keyof typeof ICON_MAP]}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
