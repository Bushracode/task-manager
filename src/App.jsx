import { TaskProvider } from './context/Taskcontext';
import { useTasks } from './context/Taskcontext';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function AppHeader() {
  const { totalCount, completedCount, pendingCount, progressPercent } = useTasks();

  return (
    <header className="app-header">
      <div className="header-top">
        <div>
          <h1>Task Manager</h1>
          {totalCount > 0 && (
            <p className="header-subtitle">
              {completedCount} of {totalCount} tasks completed
            </p>
          )}
        </div>

        {totalCount > 0 && (
          <div className="stats-pills">
            <span className="stat-pill stat-pending">{pendingCount} pending</span>
            <span className="stat-pill stat-done">{completedCount} done</span>
          </div>
        )}
      </div>

      {totalCount > 0 && (
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <main className="app-container">
        <AppHeader />
        <TaskForm />
        <div className="controls-row">
          <TaskFilter />
        </div>
        <TaskList />
      </main>
    </TaskProvider>
  );
}