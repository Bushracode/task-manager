import { useTasks } from '../context/Taskcontext';

export default function TaskFilter() {
  const {
    filter, setFilter,
    sortBy, setSortBy,
    priorityFilter, setPriorityFilter,
    completedCount,
    clearCompleted,
  } = useTasks();

  return (
    <div className="controls-wrapper">
      {/* Status filters */}
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

      {/* Priority filter */}
      <div className="filter-group filter-group-priority">
        {[
          { value: 'all', label: 'All' },
          { value: 'high', label: '🔴 High' },
          { value: 'medium', label: '🟡 Med' },
          { value: 'low', label: '🟢 Low' },
        ].map(({ value, label }) => (
          <button
            key={value}
            className={`btn-filter btn-filter-sm ${priorityFilter === value ? 'active' : ''}`}
            onClick={() => setPriorityFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right-side controls */}
      <div className="controls-right">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">↓ Newest</option>
          <option value="oldest">↑ Oldest</option>
          <option value="priority">Priority</option>
          <option value="name">A–Z</option>
          <option value="dueDate">Due Date</option>
        </select>

        {completedCount > 0 && (
          <button className="btn-clear" onClick={clearCompleted}>
            Clear done ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}