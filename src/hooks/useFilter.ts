import { useState, useMemo } from "react";

interface FilterItem {
  id: string;
  label: string;
  count: number;
  status?: "default" | "primary" | "success" | "warning" | "danger";
}

interface UseFilterOptions<T> {
  initialFilter?: string;
  filterFn?: (item: T, filterId: string) => boolean;
}

export const useFilter = <T>(
  items: T[],
  filters: FilterItem[],
  options: UseFilterOptions<T> = {}
) => {
  const { initialFilter = filters[0]?.id, filterFn } = options;
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // Update filter counts based on actual data
  const updatedFilters = useMemo(() => {
    if (!filterFn) return filters;

    return filters.map((filter) => ({
      ...filter,
      count:
        filter.id === "all" || filter.id.includes("all")
          ? items.length
          : items.filter((item) => filterFn(item, filter.id)).length,
    }));
  }, [items, filters, filterFn]);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (!filterFn || activeFilter === "all" || activeFilter.includes("all")) {
      return items;
    }
    return items.filter((item) => filterFn(item, activeFilter));
  }, [items, activeFilter, filterFn]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  return {
    activeFilter,
    filteredItems,
    filters: updatedFilters,
    handleFilterChange,
    setActiveFilter,
  };
};

// Example usage with tasks
// Task shape adapted from backend model (C#) — converted to JS/TS naming
export interface Task {
  // Keep id flexible (string|number) to avoid breaking existing mock data
  id: number | string;
  title: string;
  description?: string;
  // ISO date string or Date
  dueDate?: Date;
  // backend uses strings for status; keep as string to remain flexible
  status: string;
  assignedUserId?: number;
  createdByUserId?: number;
  projectId?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // keep UI-only field for task list priority
  priority?: "low" | "medium" | "high";
}
export const useTaskFilter = (tasks: Task[]) => {
  const filters: FilterItem[] = [
    { id: "all", label: "All Tasks", count: 0, status: "default" },
    { id: "todo", label: "To do", count: 0, status: "warning" },
    { id: "progress", label: "In Progress", count: 0, status: "primary" },
    { id: "completed", label: "Completed", count: 0, status: "success" },
  ];

  const filterFn = (task: Task, filterId: string): boolean => {
    switch (filterId) {
      case "todo":
        return task.status === "todo";
      case "progress":
        return task.status === "progress";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  };

  return useFilter(tasks, filters, { filterFn });
};

export default useFilter;
