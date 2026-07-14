"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_CTA, NAV_LINKS, PERSONAL } from "../data/content";
import { Magnetic } from "./Magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-[rgba(5,5,7,0.82)] backdrop-blur-md border-(--border-color)"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-extrabold text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-200"
        >
          {PERSONAL.name.split(" ").slice(-2).join(" ")}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <Magnetic strength={0.3}>
          <a
            href={NAV_CTA.href}
            className="inline-block font-mono text-xs font-semibold px-4 py-2 rounded-md bg-primary text-primary-foreground"
          >
            {NAV_CTA.label}
          </a>
        </Magnetic>
      </nav>
    </header>
  );
}
