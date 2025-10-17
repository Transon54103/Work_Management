import { useState } from "react";
import { Modal } from "../ui/modal";

type TaskStatus = "todo" | "progress" | "completed";

type TaskTag = "Marketing" | "Development" | "Design";

type Assignee = "Mayad Ahmed" | "Rakib Hasan" | "Anika Roy";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: TaskFormState) => void;
}

interface TaskFormState {
  title: string;
  dueDate: string;
  status: TaskStatus;
  tag: TaskTag;
  assignee: Assignee;
  description: string;
}

const initialFormState: TaskFormState = {
  title: "",
  dueDate: "",
  status: "todo",
  tag: "Marketing",
  assignee: "Mayad Ahmed",
  description: "",
};

const viewers = [
  { id: 1, name: "Anika Roy", avatar: "/images/user/user-02.png" },
  { id: 2, name: "Rakib Hasan", avatar: "/images/user/user-03.png" },
  { id: 3, name: "Yasmin Akter", avatar: "/images/user/user-04.png" },
];

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formState, setFormState] = useState<TaskFormState>(initialFormState);

  const handleChange = <K extends keyof TaskFormState>(key: K, value: TaskFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(formState);
    onClose();
    setFormState(initialFormState);
  };

  const handleCancel = () => {
    setFormState(initialFormState);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-3xl w-full p-6 sm:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Add a new task
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Effortlessly manage your to-do list: add a new task
          </p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="task-title">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              value={formState.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="Enter task title"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="due-date">
                Due Date
              </label>
              <div className="relative">
                <input
                  id="due-date"
                  type="date"
                  value={formState.dueDate}
                  onChange={(event) => handleChange("dueDate", event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={formState.status}
                onChange={(event) => handleChange("status", event.target.value as TaskStatus)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="tags">
                Tags
              </label>
              <select
                id="tags"
                value={formState.tag}
                onChange={(event) => handleChange("tag", event.target.value as TaskTag)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                <option value="Marketing">Marketing</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="assignee">
                Assignees
              </label>
              <select
                id="assignee"
                value={formState.assignee}
                onChange={(event) => handleChange("assignee", event.target.value as Assignee)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              >
                <option value="Mayad Ahmed">Mayad Ahmed</option>
                <option value="Rakib Hasan">Rakib Hasan</option>
                <option value="Anika Roy">Anika Roy</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formState.description}
              onChange={(event) => handleChange("description", event.target.value)}
              placeholder="Type your message here..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            />
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Viewers:</span>
            <div className="flex -space-x-3">
              {viewers.map((viewer) => (
                <img
                  key={viewer.id}
                  src={viewer.avatar}
                  alt={viewer.name}
                  className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-900"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600 disabled:bg-brand-300"
            >
              Create Task
            </button>
          </div>
        </footer>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
