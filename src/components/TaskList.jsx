import { useState } from 'react';
import { useTasks } from '../context/Taskcontext';

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  const [y, m, d] = dateStr.split('-');
  const due = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export default function TaskList() {
  const { tasks, toggleTask, deleteTask, editTask } = useTasks();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      editTask(id, { title: editValue.trim() });
    }
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <p className="empty-message">Nothing here — you&apos;re all clear!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const overdue = !task.completed && isOverdue(task.dueDate);
        return (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
          >
            {/* Priority dot */}
            <span className={`priority-dot priority-dot-${task.priority ?? 'medium'}`} title={`Priority: ${task.priority ?? 'medium'}`} />

            {/* Checkbox */}
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="custom-checkbox" />
            </label>

            {/* Title / Edit */}
            <div className="task-content">
              {editingId === task.id ? (
                <input
                  className="form-input edit-input"
                  value={editValue}
                  autoFocus
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(task.id);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                />
              ) : (
                <span className="task-title">{task.title}</span>
              )}

              {task.dueDate && (
                <span className={`due-chip ${overdue ? 'due-chip-overdue' : ''}`}>
                  {overdue ? '⚠ ' : '📅 '}{formatDate(task.dueDate)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="task-actions">
              {editingId === task.id ? (
                <>
                  <button className="btn-action btn-save" onClick={() => saveEdit(task.id)} title="Save">✓</button>
                  <button className="btn-action btn-cancel" onClick={cancelEdit} title="Cancel">✕</button>
                </>
              ) : (
                <>
                  {!task.completed && (
                    <button
                      className="btn-action btn-edit"
                      onClick={() => startEdit(task)}
                      title="Edit task"
                    >
                      ✎
                    </button>
                  )}
                  <button
                    className="btn-action btn-delete"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}