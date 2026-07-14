import { PERSONAL } from "../data/content";

export function Footer() {
  return (
    <footer className="py-10 border-t border-(--border-color)">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-2">
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          {PERSONAL.footerColophon}
        </p>
        <p className="font-mono text-[11px] text-muted-foreground/60">
          © {new Date().getFullYear()} {PERSONAL.name}
        </p>
      </div>
    </footer>
  );
}
