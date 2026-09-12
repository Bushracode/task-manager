import { useTasks } from '../context/Taskcontext';

export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  if (tasks.length === 0) {
    return <p className="empty-message">No tasks found for this view.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-title">{task.title}</span>
          </label>
          <button
            onClick={() => deleteTask(task.id)}
            className="btn-delete"
            aria-label="Delete task"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}