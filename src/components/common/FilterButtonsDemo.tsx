import React, { useState } from 'react';
import FilterButtons from './FilterButtons';
import ComponentCard from './ComponentCard';

const FilterButtonsDemo: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const taskFilters = [
    { id: 'all', label: 'All Tasks', count: 14, status: 'default' as const },
    { id: 'todo', label: 'To do', count: 3, status: 'warning' as const },
    { id: 'progress', label: 'In Progress', count: 4, status: 'primary' as const },
    { id: 'completed', label: 'Completed', count: 4, status: 'success' as const },
  ];

  const projectFilters = [
    { id: 'all-projects', label: 'All Projects', count: 25, status: 'default' as const },
    { id: 'active', label: 'Active', count: 18, status: 'success' as const },
    { id: 'pending', label: 'Pending Review', count: 5, status: 'warning' as const },
    { id: 'archived', label: 'Archived', count: 2, status: 'danger' as const },
  ];

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    console.log('Filter changed to:', filterId);
  };

  return (
    <div className="space-y-8">
      {/* Task Filter Example */}
      <ComponentCard 
        title="Task Filter Buttons"
        desc="Example of filter buttons for task management"
      >
        <FilterButtons
          filters={taskFilters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          className="mb-4"
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Active filter: <span className="font-medium">{activeFilter}</span>
        </div>
      </ComponentCard>

      {/* Project Filter Example */}
      <ComponentCard 
        title="Project Filter Buttons"
        desc="Different color scheme for project filters"
      >
        <FilterButtons
          filters={projectFilters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          className="mb-4"
        />
      </ComponentCard>

      {/* Responsive Layout */}
      <ComponentCard 
        title="Responsive Filter Layout"
        desc="Filter buttons adapt to different screen sizes"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {taskFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`
                inline-flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200
                ${activeFilter === filter.id 
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                }
              `}
            >
              <span>{filter.label}</span>
              <span className={`
                inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full
                ${activeFilter === filter.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }
              `}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </ComponentCard>
    </div>
  );
};

export default FilterButtonsDemo;