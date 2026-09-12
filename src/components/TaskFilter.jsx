import { useTasks } from '../context/Taskcontext';

export default function TaskFilter() {
  const { filter, setFilter } = useTasks();

  return (
    <div className="filter-group">
      {['all', 'pending', 'completed'].map((type) => (
        <button
          key={type}
          className={`btn-filter ${filter === type ? 'active' : ''}`}
          onClick={() => setFilter(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}