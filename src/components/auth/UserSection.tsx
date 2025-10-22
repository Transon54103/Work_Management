import React from "react";
import { useAuthSafe } from "../../context/AuthContext";

const UserSection: React.FC = () => {
  const auth = useAuthSafe();

  // If auth context is not available or user is not logged in, don't render
  if (!auth || !auth.user) {
    return null;
  }

  const { user, logout } = auth;

  return (
    <div className="sticky bottom-0 w-full p-4 pb-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar || "/images/user/user-01.png"}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {user.role}
          </p>
        </div>
        <button
          onClick={logout}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="Logout"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserSection;
