import { PERSONAL } from "../data/content";

export function Footer() {
  return (
    <footer
      className="text-center py-6 text-xs"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        color: "#3a4560",
      }}
    >
      {PERSONAL.footerCredit}
    </footer>
  );
}
