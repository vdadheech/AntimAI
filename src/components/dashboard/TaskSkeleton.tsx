"use client";

// ============================================================
// AntimAI — Task Skeleton (Loading Placeholder)
// ============================================================

interface TaskSkeletonProps {
  delay?: number;
}

export default function TaskSkeleton({ delay = 0 }: TaskSkeletonProps) {
  return (
    <div
      className="glass-card p-5 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="shimmer h-4 w-20 rounded" />
        <div className="shimmer h-5 w-24 rounded-full" />
      </div>

      {/* Title */}
      <div className="shimmer h-5 w-3/4 rounded mb-2" />
      <div className="shimmer h-4 w-1/2 rounded mb-4" />

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="shimmer h-3 w-full rounded" />
        <div className="shimmer h-3 w-5/6 rounded" />
        <div className="shimmer h-3 w-2/3 rounded" />
      </div>

      {/* Documents */}
      <div className="flex gap-2 mb-4">
        <div className="shimmer h-5 w-16 rounded-full" />
        <div className="shimmer h-5 w-20 rounded-full" />
        <div className="shimmer h-5 w-14 rounded-full" />
      </div>

      {/* Bottom */}
      <div
        className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="shimmer h-6 w-24 rounded-full" />
        <div className="shimmer h-6 w-16 rounded" />
      </div>
    </div>
  );
}
