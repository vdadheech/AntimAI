"use client";

// ============================================================
// AntimAI — Task Card Component
// ============================================================

import { TaskRecord, TaskStatus } from "@/types";
import { CATEGORY_ICONS } from "@/lib/constants";
import UrgencyBadge from "@/components/shared/UrgencyBadge";

interface TaskCardProps {
  task: TaskRecord;
  index: number;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onGenerateLetter: (taskId: string) => void;
  isGeneratingLetter: boolean;
}

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  pending: "in-progress",
  "in-progress": "done",
  done: "pending",
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "⏳ Pending",
  "in-progress": "🔄 In Progress",
  done: "✅ Done",
};

export default function TaskCard({
  task,
  index,
  onStatusChange,
  onGenerateLetter,
  isGeneratingLetter,
}: TaskCardProps) {
  const documents = task.documentsRequiredJson as string[];
  const categoryIcon = CATEGORY_ICONS[task.category] || "📌";

  return (
    <div
      className={`glass-card p-5 flex flex-col animate-slide-up ${
        task.status === "done" ? "opacity-60" : ""
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top Row: Category + Urgency */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{categoryIcon}</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
            {task.category}
          </span>
        </div>
        <UrgencyBadge
          urgency={task.urgency as any}
          pulse={task.urgency === "immediate" && task.status !== "done"}
        />
      </div>

      {/* Institution + Title */}
      <h3 className="text-base font-semibold mb-1 line-clamp-2">
        {task.institution}
      </h3>
      <p className="text-sm text-accent font-medium mb-2">{task.title}</p>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
        {task.description}
      </p>

      {/* Documents Required */}
      {documents && documents.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-slate-500 font-medium mb-1.5">
            📎 Documents Required:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {documents.slice(0, 4).map((doc, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                {doc}
              </span>
            ))}
            {documents.length > 4 && (
              <span className="text-xs text-slate-500">
                +{documents.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Estimated Days + Portal */}
      <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
        {task.estimatedDays && (
          <span>⏱ ~{task.estimatedDays} days</span>
        )}
        {task.officialPortalUrl && (
          <a
            href={task.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            🔗 Official Portal
          </a>
        )}
      </div>

      {/* State-specific note */}
      {task.stateSpecificNote && (
        <div
          className="text-xs p-2.5 rounded-lg mb-4"
          style={{
            background: "rgba(59, 130, 246, 0.08)",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            color: "#93c5fd",
          }}
        >
          📍 {task.stateSpecificNote}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
        {/* Status Toggle */}
        <button
          onClick={() => onStatusChange(task.id, STATUS_CYCLE[task.status as TaskStatus])}
          className={`status-badge ${task.status}`}
        >
          {STATUS_LABELS[task.status as TaskStatus]}
        </button>

        {/* Generate Letter Button */}
        <button
          onClick={() => onGenerateLetter(task.id)}
          disabled={isGeneratingLetter}
          className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-accent/10 text-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isGeneratingLetter ? (
            <>
              <span className="w-3 h-3 border border-accent/30 border-t-accent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>📄 Letter</>
          )}
        </button>
      </div>
    </div>
  );
}
