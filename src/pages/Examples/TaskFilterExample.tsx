import React from 'react';
import FilterButtons from '../../components/common/FilterButtons';
import ComponentCard from '../../components/common/ComponentCard';
import { useTaskFilter, Task } from '../../hooks/useFilter';

const TaskFilterExample: React.FC = () => {
  // Sample tasks data
  const sampleTasks: Task[] = [
    { id: '1', title: 'Design homepage mockup', status: 'completed', priority: 'high' },
    { id: '2', title: 'Implement user authentication', status: 'progress', priority: 'high' },
    { id: '3', title: 'Write API documentation', status: 'todo', priority: 'medium' },
    { id: '4', title: 'Set up database schema', status: 'completed', priority: 'high' },
    { id: '5', title: 'Create login form', status: 'progress', priority: 'medium' },
    { id: '6', title: 'Add responsive design', status: 'todo', priority: 'low' },
    { id: '7', title: 'Implement dark mode', status: 'progress', priority: 'low' },
    { id: '8', title: 'Write unit tests', status: 'todo', priority: 'medium' },
    { id: '9', title: 'Deploy to production', status: 'completed', priority: 'high' },
    { id: '10', title: 'Setup CI/CD pipeline', status: 'completed', priority: 'medium' },
    { id: '11', title: 'Add search functionality', status: 'progress', priority: 'medium' },
    { id: '12', title: 'Optimize performance', status: 'todo', priority: 'low' },
    { id: '13', title: 'Add user profile page', status: 'todo', priority: 'medium' },
    { id: '14', title: 'Implement notifications', status: 'todo', priority: 'low' },
  ];

  const { activeFilter, filteredItems, filters, handleFilterChange } = useTaskFilter(sampleTasks);

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'progress':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'todo':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20';
      case 'low':
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <ComponentCard 
        title="Task Management with Filter Buttons"
        desc="Filter tasks by status using interactive buttons"
      >
        {/* Filter Buttons */}
        <div className="mb-6">
          <FilterButtons
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No tasks found for the selected filter.
            </div>
          ) : (
            filteredItems.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </h4>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Priority Badge */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  
                  {/* Status Badge */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status === 'progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-medium">{filteredItems.length}</span> of{' '}
            <span className="font-medium">{sampleTasks.length}</span> tasks
          </p>
        </div>
      </ComponentCard>
    </div>
  );
};

export default TaskFilterExample;