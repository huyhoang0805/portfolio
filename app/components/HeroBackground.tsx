"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy-load: mỗi effect là 1 chunk riêng, chỉ tải cái thực sự render theo thiết bị.
const DotGrid = dynamic(() => import("./DotGrid").then((m) => m.DotGrid), {
  ssr: false,
});
const SideRays = dynamic(() => import("./SideRays").then((m) => m.SideRays), {
  ssr: false,
});

/**
 * Background của Hero, chọn theo khả năng con trỏ:
 * - Desktop (hover + con trỏ chính xác) → DotGrid tương tác theo chuột.
 * - Mobile/touch (không hover) → SideRays (hiệu ứng thụ động, không cần con trỏ).
 * Full-bleed, fade dần tới 80% chiều cao section.
 */
export function HeroBackground() {
  const [canHover, setCanHover] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Chưa xác định thiết bị → không render để tránh tải nhầm chunk / hydration mismatch
  if (canHover === null) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        maskImage: "linear-gradient(to bottom, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 92%, transparent)",
      }}
    >
      {canHover ? (
        <DotGrid
          dotSize={5}
          gap={26}
          baseColor="#1e3454"
          activeColor="#3fa9ff"
          proximity={150}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          edgeScale={0.4}
        />
      ) : (
        <SideRays
          speed={2.5}
          rayColor1="#3fa9ff"
          rayColor2="#7cc4ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      )}
    </div>
  );
}
