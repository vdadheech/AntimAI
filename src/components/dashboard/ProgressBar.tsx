"use client";

// ============================================================
// AntimAI — Progress Bar Component
// ============================================================

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="glass-card p-6 mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold">Overall Progress</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {completed} of {total} tasks completed
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-gradient">{percentage}%</span>
        </div>
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            "--progress-width": `${percentage}%`,
          } as React.CSSProperties}
        />
      </div>

      {/* Milestone indicators */}
      {percentage === 100 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-green-400 animate-fade-in">
          <span>🎉</span>
          <span>All tasks completed! Great work.</span>
        </div>
      )}
      {percentage > 0 && percentage < 100 && (
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <span>💪</span>
          <span>Keep going — you&apos;re making progress!</span>
        </div>
      )}
    </div>
  );
}
