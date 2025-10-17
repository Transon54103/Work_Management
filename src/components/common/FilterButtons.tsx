import React from 'react';

interface FilterItem {
  id: string;
  label: string;
  count: number;
  status?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

interface FilterButtonsProps {
  filters: FilterItem[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  className = "",
}) => {
  const getButtonStyles = (isActive: boolean) => {
    // Base styles với border width cố định để tránh layout shift
    const baseStyles = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";
    
    if (isActive) {
      return `${baseStyles} bg-gray-900 text-white border-gray-900 hover:bg-gray-800 focus:ring-gray-500 dark:bg-white dark:text-gray-900 dark:border-white dark:hover:bg-gray-100`;
    } else {
      return `${baseStyles} bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700`;
    }
  };

  const getCountStyles = (isActive: boolean) => {
    // Sử dụng min-width để đảm bảo kích thước cố định
    const baseStyles = "ml-2 inline-flex items-center justify-center min-w-[24px] h-[20px] px-2 text-xs font-semibold leading-none rounded-full transition-colors duration-200";
    
    if (isActive) {
      return `${baseStyles} bg-gray-700 text-white dark:bg-gray-200 dark:text-gray-900`;
    } else {
      return `${baseStyles} bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300`;
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={getButtonStyles(isActive)}
          >
            <span>{filter.label}</span>
            <span className={getCountStyles(isActive)}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;