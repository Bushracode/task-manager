import { useState } from 'react';
import { useTasks } from '../context/Taskcontext';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim(), priority, dueDate);
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form-main">
        <input
          type="text"
          className="form-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={!title.trim()}>
          + Add
        </button>
      </div>

      <div className="task-form-advanced">
        <button
          type="button"
          className="btn-toggle-advanced"
          onClick={() => setShowAdvanced((v) => !v)}
        >
          {showAdvanced ? '▲ Less' : '▼ Options'}
        </button>

        {showAdvanced && (
          <div className="advanced-options">
            <div className="option-group">
              <label className="option-label">Priority</label>
              <div className="priority-selector">
                {['high', 'medium', 'low'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`priority-btn priority-${p} ${priority === p ? 'selected' : ''}`}
                    onClick={() => setPriority(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label className="option-label" htmlFor="due-date">Due Date</label>
              <input
                id="due-date"
                type="date"
                className="form-input form-input-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}