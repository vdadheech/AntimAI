"use client";

// ============================================================
// AntimAI — Logo Component
// ============================================================

export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-5xl",
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2 group transition-transform duration-700 hover:scale-105">
      <div className={`font-display font-medium tracking-widest uppercase ${s} engraved-text`}>
        <span className="text-academia-fg">Antim</span>
        <span className="text-gradient">AI</span>
      </div>
    </div>
  );
}
