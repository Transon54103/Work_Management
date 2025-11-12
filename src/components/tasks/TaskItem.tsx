import React from "react";

export interface TaskItemProps {
  id: string;
  title: string;
  status: "todo" | "progress" | "completed";
  dueDate?: Date;
  category?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  isCompleted?: boolean;
  onToggleComplete?: (id: string) => void;
  onClick?: (id: string) => void;
  draggable?: boolean;
  onDragStartTask?: (id: string) => void;
  onDragEndTask?: () => void;
  isDragging?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  status,
  dueDate,
  category,
  assignee,
  isCompleted = false,
  onToggleComplete,
  onClick,
  draggable = true,
  onDragStartTask,
  onDragEndTask,
  isDragging = false,
}) => {
  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleComplete?.(id);
  };

  const handleItemClick = () => {
    onClick?.(id);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    if (!draggable) return;
    event.dataTransfer.setData("text/plain", id);
    event.dataTransfer.effectAllowed = "move";
    onDragStartTask?.(id);
  };

  const handleDragEnd = () => {
    onDragEndTask?.();
  };

  const formatDate = (value?: string) => {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return value;
    }
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const baseCategoryColor = (value?: string) => {
    switch (value?.toLowerCase()) {
      case "marketing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "template":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400";
      case "development":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const containerClasses = [
    "group flex items-center gap-4 rounded-2xl border transition-all duration-200 cursor-pointer p-4 sm:p-5",
    isCompleted
      ? "border-transparent bg-[#EEF2FF] hover:bg-[#E0E7FF] dark:border-brand-500/30 dark:bg-brand-500/10 dark:hover:bg-brand-500/20"
      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700/50",
    isDragging ? "opacity-60 ring-2 ring-brand-200 dark:ring-brand-400/60" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const checkboxClasses = [
    "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200",
    isCompleted
      ? "border-brand-500 bg-brand-500 text-white shadow-[0_8px_16px_rgba(99,102,241,0.25)]"
      : "border-gray-300 bg-white text-transparent hover:border-brand-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-brand-400",
  ].join(" ");

  const titleClasses = [
    "truncate text-sm font-medium",
    isCompleted
      ? "text-gray-500 line-through dark:text-gray-400"
      : "text-gray-900 dark:text-white",
  ].join(" ");

  const categoryClasses = [
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200",
    category
      ? isCompleted
        ? "bg-[#DDE4FF] text-brand-600 dark:bg-brand-500/20 dark:text-brand-200"
        : baseCategoryColor(category)
      : "",
  ].join(" ");

  const metaTextClasses = isCompleted
    ? "text-gray-400 dark:text-gray-500"
    : "text-gray-500 dark:text-gray-400";

  const numericId = Number.parseInt(id, 10);
  const commentCount = Number.isNaN(numericId) ? 1 : (numericId % 3) + 1;

  return (
    <div
      className={containerClasses}
      onClick={handleItemClick}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      data-status={status}
      aria-grabbed={isDragging}
      role="listitem"
    >
      <div className="hidden text-gray-300 transition-colors duration-200 sm:block sm:flex-shrink-0 sm:group-hover:text-gray-400 dark:text-gray-600 dark:group-hover:text-gray-500">
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 5a1 1 0 11-2 0 1 1 0 012 0zm0 5a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100 2 1 1 0 000-2zm7-9a1 1 0 112 0 1 1 0 01-2 0zm2 9a1 1 0 10-2 0 1 1 0 002 0zm-2-4a1 1 0 112 0 1 1 0 01-2 0z" />
        </svg>
      </div>

      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={handleCheckboxClick}
          className={checkboxClasses}
          aria-pressed={isCompleted}
          aria-label={
            isCompleted
              ? "Mark task as not completed"
              : "Mark task as completed"
          }
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              d="M5 10.5l3 3L15 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <h4 className={titleClasses}>{title}</h4>
          {category && <span className={categoryClasses}>{category}</span>}
        </div>
      </div>

      {dueDate && (
        <div className="flex-shrink-0">
          <div className={`flex items-center gap-1 text-xs ${metaTextClasses}`}>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(dueDate?.toISOString())}</span>
          </div>
        </div>
      )}

      <div className="flex-shrink-0">
        <div className={`flex items-center gap-1 text-xs ${metaTextClasses}`}>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
            />
          </svg>
          <span>{commentCount}</span>
        </div>
      </div>

      {assignee && (
        <div className="flex-shrink-0">
          <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-gray-700">
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="h-full w-full object-cover"
              onError={(event) => {
                const target = event.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  assignee.name
                )}&background=6366f1&color=fff`;
              }}
            />
          </div>
        </div>
      )}

      <div className="flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          type="button"
          className="rounded p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Task options"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
