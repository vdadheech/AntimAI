"use client";

// ============================================================
// AntimAI — Filter Tabs Component
// ============================================================

import { TaskRecord } from "@/types";

type FilterValue = "all" | "immediate" | "financial" | "government" | "digital" | "utility";

interface FilterTabsProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
  tasks: TaskRecord[];
}

const FILTERS: { value: FilterValue; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "📋" },
  { value: "immediate", label: "Urgent", icon: "🔴" },
  { value: "financial", label: "Financial", icon: "💰" },
  { value: "government", label: "Government", icon: "🏛️" },
  { value: "digital", label: "Digital", icon: "💻" },
  { value: "utility", label: "Utility", icon: "🔧" },
];

export default function FilterTabs({
  activeFilter,
  onFilterChange,
  tasks,
}: FilterTabsProps) {
  const getCount = (filter: FilterValue): number => {
    if (filter === "all") return tasks.length;
    if (filter === "immediate")
      return tasks.filter((t) => t.urgency === "immediate").length;
    return tasks.filter((t) => t.category === filter).length;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      {FILTERS.map((filter) => {
        const count = getCount(filter.value);
        if (filter.value !== "all" && count === 0) return null;

        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`filter-tab flex items-center gap-1.5 ${
              activeFilter === filter.value ? "active" : ""
            }`}
          >
            <span className="text-sm">{filter.icon}</span>
            <span>{filter.label}</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded-full ml-1"
              style={{
                background:
                  activeFilter === filter.value
                    ? "rgba(249, 115, 22, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
