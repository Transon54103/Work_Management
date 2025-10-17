import React, { useState } from "react";
import TaskItem, { TaskItemProps } from "./TaskItem";

type TaskStatus = TaskItemProps["status"];

interface TaskSectionProps {
  title: string;
  count: number;
  tasks: TaskItemProps[];
  status: TaskStatus;
  onToggleComplete?: (id: string) => void;
  onTaskClick?: (id: string) => void;
  onTaskDrop?: (taskId: string, targetStatus: TaskStatus) => void;
  onTaskDragStart?: (taskId: string) => void;
  onTaskDragEnd?: () => void;
  draggedTaskId?: string | null;
  showEmptyState?: boolean;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  count,
  tasks,
  status,
  onToggleComplete,
  onTaskClick,
  onTaskDrop,
  onTaskDragStart,
  onTaskDragEnd,
  draggedTaskId,
  showEmptyState = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTaskId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTaskId) return;
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const related = event.relatedTarget as Node | null;
    if (!related || !event.currentTarget.contains(related)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTaskId) return;
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain") || draggedTaskId;
    event.dataTransfer.clearData();
    setIsDragOver(false);
    if (taskId) {
      onTaskDrop?.(taskId, status);
    }
    onTaskDragEnd?.();
  };

  const dropZoneClasses = [
    "rounded-2xl p-1 transition-colors duration-200",
    tasks.length === 0 ? "min-h-[80px]" : "",
    isDragOver
      ? "bg-brand-50/80 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:ring-brand-400/40"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {count}
        </span>
      </div>

      <div
        className={dropZoneClasses}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label={`${title} tasks`}
        aria-dropeffect="move"
      >
        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                {...task}
                onToggleComplete={onToggleComplete}
                onClick={onTaskClick}
                onDragStartTask={onTaskDragStart}
                onDragEndTask={onTaskDragEnd}
                isDragging={draggedTaskId === task.id}
              />
            ))}
          </div>
        ) : showEmptyState ? (
          <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-xs font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-500">
            Drag & drop tasks here
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskSection;