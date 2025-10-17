# Filter Buttons Component

## Mô tả
Component FilterButtons cung cấp các nút lọc tương tác với thiết kế hiện đại, hỗ trợ dark mode và responsive design.

## Cách sử dụng

### 1. Import component
```tsx
import FilterButtons from './components/common/FilterButtons';
import { useTaskFilter } from './hooks/useFilter';
```

### 2. Sử dụng cơ bản
```tsx
const MyComponent = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Tasks', count: 14, status: 'default' },
    { id: 'todo', label: 'To do', count: 3, status: 'warning' },
    { id: 'progress', label: 'In Progress', count: 4, status: 'primary' },
    { id: 'completed', label: 'Completed', count: 4, status: 'success' },
  ];

  return (
    <FilterButtons
      filters={filters}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
    />
  );
};
```

### 3. Sử dụng với hook useTaskFilter
```tsx
const TaskList = () => {
  const tasks = [...]; // Dữ liệu tasks
  const { activeFilter, filteredItems, filters, handleFilterChange } = useTaskFilter(tasks);

  return (
    <div>
      <FilterButtons
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      
      {filteredItems.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};
```

## Props

### FilterButtons Props
| Prop | Type | Required | Mô tả |
|------|------|----------|-------|
| filters | FilterItem[] | ✓ | Mảng các filter item |
| activeFilter | string | ✓ | ID của filter đang active |
| onFilterChange | (filterId: string) => void | ✓ | Callback khi thay đổi filter |
| className | string | ✗ | CSS class tùy chỉnh |

### FilterItem Interface
```tsx
interface FilterItem {
  id: string;
  label: string;
  count: number;
  status?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}
```

## Màu sắc và trạng thái

- **default**: Màu xám (cho "All" items)
- **primary**: Màu xanh dương (cho "In Progress")
- **success**: Màu xanh lá (cho "Completed")
- **warning**: Màu vàng (cho "To do", "Pending")
- **danger**: Màu đỏ (cho "Archived", "Error")

## Features

✅ Responsive design  
✅ Dark mode support  
✅ TypeScript support  
✅ Accessible (keyboard navigation, ARIA)  
✅ Customizable colors  
✅ Animation transitions  
✅ Count badges  

## Examples

### 1. Task Management
```tsx
const taskFilters = [
  { id: 'all', label: 'All Tasks', count: 14, status: 'default' },
  { id: 'todo', label: 'To do', count: 3, status: 'warning' },
  { id: 'progress', label: 'In Progress', count: 4, status: 'primary' },
  { id: 'completed', label: 'Completed', count: 4, status: 'success' },
];
```

### 2. Project Status
```tsx
const projectFilters = [
  { id: 'all', label: 'All Projects', count: 25, status: 'default' },
  { id: 'active', label: 'Active', count: 18, status: 'success' },
  { id: 'pending', label: 'Pending Review', count: 5, status: 'warning' },
  { id: 'archived', label: 'Archived', count: 2, status: 'danger' },
];
```

### 3. User Roles
```tsx
const roleFilters = [
  { id: 'all', label: 'All Users', count: 150, status: 'default' },
  { id: 'admin', label: 'Admins', count: 5, status: 'danger' },
  { id: 'editor', label: 'Editors', count: 25, status: 'primary' },
  { id: 'viewer', label: 'Viewers', count: 120, status: 'success' },
];
```

## Tùy chỉnh style

Bạn có thể tùy chỉnh style bằng cách:

1. Sử dụng prop `className`
2. Override CSS classes
3. Tạo theme variants mới

## Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

## Demo

Xem file `TaskFilterExample.tsx` để xem demo hoàn chỉnh với dữ liệu thật.