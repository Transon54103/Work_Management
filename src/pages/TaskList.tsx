import React, { useCallback, useMemo, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import FilterButtons from "../components/common/FilterButtons";
import TaskSection from "../components/tasks/TaskSection";
import AddTaskModal from "../components/tasks/AddTaskModal";
import { useTaskFilter, Task } from "../hooks/useFilter";
import { TaskItemProps } from "../components/tasks/TaskItem";

type TaskStatus = Task["status"];
type TaskListTask = Task & { previousStatus?: TaskStatus };

const categoryMap: Record<string, string> = {
  "Solve the Dribble prioritization issue with the team": "Marketing",
  "Work in Progress (WIP) Dashboard": "Template",
  "Finish user onboarding": "Marketing",
  "Product Update - Q4 2024": "Template",
  "Kanban Flow Manager": "Marketing",
  "Make internal feedback": "Template",
};

const dueDateMap: Record<string, string> = {
  "1": "Tomorrow",
  "2": "Feb 12, 2024",
  "3": "Jan 8, 2027",
  "4": "Jan 8, 2027",
  "5": "Tomorrow",
  "6": "Jan 8, 2027",
  "7": "Jan 8, 2027",
};

const assigneeMap: Record<string, { name: string; avatar: string }> = {
  "1": { name: "John Doe", avatar: "/images/user/user-01.png" },
  "2": { name: "Jane Smith", avatar: "/images/user/user-02.png" },
  "3": { name: "Mike Johnson", avatar: "/images/user/user-03.png" },
  "4": { name: "Sarah Wilson", avatar: "/images/user/user-04.png" },
  "5": { name: "David Brown", avatar: "/images/user/user-05.png" },
  "6": { name: "Lisa Davis", avatar: "/images/user/user-06.png" },
  "7": { name: "Tom Anderson", avatar: "/images/user/user-07.png" },
};

const initialTasks: TaskListTask[] = [
  {
    id: "1",
    title: "Solve the Dribble prioritization issue with the team",
    status: "todo",
    priority: "high",
  },
  {
    id: "2",
    title: "Finish user onboarding",
    status: "todo",
    priority: "medium",
  },
  {
    id: "3",
    title: "Work in Progress (WIP) Dashboard",
    status: "progress",
    priority: "high",
  },
  {
    id: "4",
    title: "Product Update - Q4 2024",
    status: "progress",
    priority: "medium",
  },
  {
    id: "5",
    title: "Finish user onboarding",
    status: "progress",
    priority: "low",
  },
  {
    id: "6",
    title: "Kanban Flow Manager",
    status: "progress",
    priority: "medium",
  },
  {
    id: "7",
    title: "Make internal feedback",
    status: "progress",
    priority: "low",
  },
];

const TaskList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskListTask[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const { activeFilter, filteredItems, filters, handleFilterChange } = useTaskFilter(tasks);

  const convertToTaskItem = useCallback(
    (task: TaskListTask): TaskItemProps => ({
      id: task.id,
      title: task.title,
      status: task.status,
      category: categoryMap[task.title] || "General",
      dueDate: dueDateMap[task.id],
      assignee: assigneeMap[task.id],
      isCompleted: task.status === "completed",
    }),
    []
  );

  const handleToggleComplete = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        if (task.status === "completed") {
          return {
            ...task,
            status: task.previousStatus ?? "todo",
            previousStatus: undefined,
          };
        }

        return {
          ...task,
          previousStatus: task.status,
          status: "completed",
        };
      })
    );
  };

  const handleTaskClick = (taskId: string) => {
    console.log("Clicked task:", taskId);
    // Implement task detail view or edit
  };

  const handleTaskDrop = (taskId: string, targetStatus: TaskStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        if (targetStatus === "completed") {
          const originStatus =
            task.status === "completed"
              ? task.previousStatus ?? "todo"
              : task.status;

          return {
            ...task,
            status: "completed",
            previousStatus: originStatus,
          };
        }

        return {
          ...task,
          status: targetStatus,
          previousStatus: undefined,
        };
      })
    );
    setDraggedTaskId(null);
  };

  const handleTaskDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleTaskDragEnd = () => {
    setDraggedTaskId(null);
  };

  const groupedTasks = useMemo(
    () => ({
      todo: filteredItems
        .filter((task) => task.status === "todo")
        .map((task) => convertToTaskItem(task as TaskListTask)),
      progress: filteredItems
        .filter((task) => task.status === "progress")
        .map((task) => convertToTaskItem(task as TaskListTask)),
      completed: filteredItems
        .filter((task) => task.status === "completed")
        .map((task) => convertToTaskItem(task as TaskListTask)),
    }),
    [filteredItems, convertToTaskItem]
  );

  const getFilterCount = (id: string) => filters.find((filter) => filter.id === id)?.count ?? 0;

  return (
    <div>
      <PageMeta
        title="Task List | TailAdmin - React.js Admin Dashboard Template"
        description="Task management interface with filter and list view"
      />
        <PageBreadcrumb pageTitle="Task List" />
      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Filter Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <FilterButtons
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
            
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                  />
                </svg>
                Filter & Short
              </button>
              
              <button
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium bg-brand-500 text-white shadow-theme-xs transition hover:bg-brand-600 disabled:bg-brand-300"
                onClick={() => setIsCreateModalOpen(true)}
                type="button"
              >
                <span>Add New Task</span>
                <svg
                  className="fill-current"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Task Sections */}
        <div className="space-y-8 p-6">
          {/* Todo Section */}
          {(activeFilter === "all" || activeFilter === "todo") && (
            <TaskSection
              title="Todo"
              status="todo"
              count={getFilterCount("todo")}
              tasks={groupedTasks.todo}
              onToggleComplete={handleToggleComplete}
              onTaskClick={handleTaskClick}
              onTaskDrop={handleTaskDrop}
              onTaskDragStart={handleTaskDragStart}
              onTaskDragEnd={handleTaskDragEnd}
              draggedTaskId={draggedTaskId}
              showEmptyState={activeFilter === "all"}
            />
          )}

          {/* In Progress Section */}
          {(activeFilter === "all" || activeFilter === "progress") && (
            <TaskSection
              title="In-Progress"
              status="progress"
              count={getFilterCount("progress")}
              tasks={groupedTasks.progress}
              onToggleComplete={handleToggleComplete}
              onTaskClick={handleTaskClick}
              onTaskDrop={handleTaskDrop}
              onTaskDragStart={handleTaskDragStart}
              onTaskDragEnd={handleTaskDragEnd}
              draggedTaskId={draggedTaskId}
              showEmptyState={activeFilter === "all"}
            />
          )}

          {/* Completed Section */}
          {(activeFilter === "all" || activeFilter === "completed") && (
            <TaskSection
              title="Completed"
              status="completed"
              count={getFilterCount("completed")}
              tasks={groupedTasks.completed}
              onToggleComplete={handleToggleComplete}
              onTaskClick={handleTaskClick}
              onTaskDrop={handleTaskDrop}
              onTaskDragStart={handleTaskDragStart}
              onTaskDragEnd={handleTaskDragEnd}
              draggedTaskId={draggedTaskId}
              showEmptyState={activeFilter === "all"}
            />
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 20h16M20 28h8m-8-8V8a4 4 0 118 0v4m-4 8v8m-4-4h8m-8 0a4 4 0 01-4-4V20a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4h-8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">No tasks found</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No tasks match the current filter. Try adjusting your filter or create a new task.
              </p>
            </div>
          )}
        </div>
      </div>

      <AddTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => {
          console.log("Create task", data);
        }}
      />
    </div>
  );
};

export default TaskList;