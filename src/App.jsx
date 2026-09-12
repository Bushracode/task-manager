import { TaskProvider } from './context/Taskcontext';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

export default function App() {
  return (
    <TaskProvider>
      <main className="app-container">
        <header className="app-header">
          <h1>Task Manager</h1>

        </header>

        <TaskForm />

        <div className="controls-row">
          <TaskFilter />
        </div>

        <TaskList />
      </main>
    </TaskProvider>
  );
}