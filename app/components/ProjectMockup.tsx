/** Browser-frame mockup hiển thị trong Featured Projects */
export function ProjectMockup() {
  return (
    <div
      className="shimmer-card rounded-2xl overflow-hidden shrink-0 w-full md:w-[400px] h-[260px] flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70" />
        <div
          className="flex-1 mx-3 h-4 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* Skeleton content */}
      <div className="flex-1 p-4 flex flex-col gap-3">
        {/* Headline skeleton */}
        <div
          className="h-4 w-3/4 rounded-lg"
          style={{ background: "rgba(61,139,255,0.18)" }}
        />
        {/* Subheader bar */}
        <div
          className="h-2 w-1/2 rounded-lg"
          style={{ background: "rgba(61,139,255,0.1)" }}
        />

        {/* Body lines */}
        <div className="h-px w-full my-0.5" style={{ background: "rgba(255,255,255,0.06)" }} />
        {[1, 0.85, 0.7].map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded-lg"
            style={{ width: `${w * 100}%`, background: "rgba(255,255,255,0.05)" }}
          />
        ))}

        {/* Card row */}
        <div className="flex gap-2 mt-1">
          {[1, 1, 0.7].map((w, i) => (
            <div
              key={i}
              className="h-12 rounded-xl flex-1"
              style={{ background: "rgba(61,139,255,0.07)", border: "1px solid rgba(61,139,255,0.1)" }}
            />
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-auto flex gap-2">
          <div
            className="h-7 w-24 rounded-lg"
            style={{
              background: "linear-gradient(135deg, rgba(61,139,255,0.25), rgba(37,99,235,0.2))",
              border: "1px solid rgba(61,139,255,0.2)",
            }}
          />
          <div className="h-7 w-16 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>
      </div>
    </div>
  );
}
