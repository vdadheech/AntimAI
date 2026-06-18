"use client";

// ============================================================
// AntimAI — Urgency Badge Component
// ============================================================

import { TaskUrgency } from "@/types";
import { URGENCY_CONFIG } from "@/lib/constants";

interface UrgencyBadgeProps {
  urgency: TaskUrgency;
  pulse?: boolean;
}

export default function UrgencyBadge({ urgency, pulse = false }: UrgencyBadgeProps) {
  const config = URGENCY_CONFIG[urgency];

  return (
    <span
      className={`urgency-badge ${pulse && urgency === "immediate" ? "animate-pulse-glow" : ""}`}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}
