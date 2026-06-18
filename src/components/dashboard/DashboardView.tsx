"use client";

// ============================================================
// AntimAI — Dashboard View (Main Dashboard Component)
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { TaskRecord, TaskStatus, TaskUrgency } from "@/types";
import { CATEGORY_ICONS } from "@/lib/constants";
import ProgressBar from "./ProgressBar";
import FilterTabs from "./FilterTabs";
import TaskCard from "./TaskCard";
import TaskSkeleton from "./TaskSkeleton";

interface DashboardViewProps {
  caseId: string;
  deceasedName: string;
  heirsName: string;
}

type FilterValue = "all" | "immediate" | "financial" | "government" | "digital" | "utility";

export default function DashboardView({
  caseId,
  deceasedName,
  heirsName,
}: DashboardViewProps) {
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [generatingLetter, setGeneratingLetter] = useState<string | null>(null);

  // Fetch tasks — poll while no tasks exist
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks?caseId=${caseId}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || []);
        if (data.tasks && data.tasks.length > 0) {
          setLoading(false);
        }
        return data.tasks?.length > 0;
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
    return false;
  }, [caseId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let mounted = true;

    const startPolling = async () => {
      const hasTasks = await fetchTasks();
      if (!hasTasks && mounted) {
        // Poll every 3 seconds until tasks appear
        interval = setInterval(async () => {
          const found = await fetchTasks();
          if (found) {
            clearInterval(interval);
          }
        }, 3000);
      }
    };

    startPolling();

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [fetchTasks]);

  // Toggle task status
  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        // Revert on failure
        await fetchTasks();
      }
    } catch {
      await fetchTasks();
    }
  };

  // Generate letter
  const handleGenerateLetter = async (taskId: string) => {
    setGeneratingLetter(taskId);
    try {
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, caseId }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `AntimAI_Letter_${taskId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to generate letter");
      }
    } catch {
      alert("Failed to generate letter. Please try again.");
    } finally {
      setGeneratingLetter(null);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "immediate") return task.urgency === "immediate";
    return task.category === activeFilter;
  });

  // Stats
  const completed = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
            <div>
              <p className="text-sm text-accent font-medium mb-1">
                Case for {deceasedName}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Your Action Dashboard
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Welcome, {heirsName}
            </p>
          </div>
        </div>

        {loading ? (
          /* Loading State */
          <div className="animate-fade-in">
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                <div>
                  <p className="text-sm font-medium">
                    Generating your personalized checklist...
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Our AI is analyzing your case and creating tasks. This usually
                    takes 15-30 seconds.
                  </p>
                </div>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: "60%", animation: "shimmer 2s linear infinite, progressFill 3s ease-out forwards" }}
                />
              </div>
            </div>

            {/* Skeleton cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <TaskSkeleton key={i} delay={i * 0.1} />
              ))}
            </div>
          </div>
        ) : (
          /* Loaded State */
          <div className="animate-fade-in">
            {/* Progress Bar */}
            <ProgressBar completed={completed} total={total} />

            {/* Filter Tabs */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              tasks={tasks}
            />

            {/* Task Grid */}
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onStatusChange={handleStatusChange}
                    onGenerateLetter={handleGenerateLetter}
                    isGeneratingLetter={generatingLetter === task.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-slate-400">No tasks match this filter.</p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="text-accent text-sm mt-2 hover:underline"
                >
                  Show all tasks
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
