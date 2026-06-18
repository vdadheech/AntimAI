"use client";

// ============================================================
// AntimAI — Logo Component
// ============================================================

export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { text: "text-lg", dot: "w-2 h-2" },
    default: { text: "text-2xl", dot: "w-2.5 h-2.5" },
    large: { text: "text-4xl", dot: "w-3 h-3" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <span className={`${s.text} font-bold tracking-tight`}>
          <span className="text-white">Antim</span>
          <span className="text-gradient">AI</span>
        </span>
      </div>
      <div
        className={`${s.dot} rounded-full bg-accent animate-pulse-glow`}
        style={{ marginTop: "-8px" }}
      />
    </div>
  );
}
