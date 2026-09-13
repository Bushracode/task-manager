// src/context/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('react_user');
    return localUser ? JSON.parse(localUser) : { name: 'Developer', isAuthenticated: true };
  });

  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem('react_tasks');
    return localData ? JSON.parse(localData) : [];
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('react_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('react_user', JSON.stringify(user));
  }, [user]);

  const addTask = (title, priority = 'medium', dueDate = '') => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const loginUser = (name) => setUser({ name, isAuthenticated: true });
  const logoutUser = () => setUser({ name: '', isAuthenticated: false });

  // Stats on raw tasks
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

  const filteredAndSorted = tasks
    .filter((task) => {
      const statusMatch =
        filter === 'pending' ? !task.completed :
        filter === 'completed' ? task.completed : true;
      const priorityMatch =
        priorityFilter === 'all' ? true : task.priority === priorityFilter;
      return statusMatch && priorityMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'priority') return PRIORITY_ORDER[a.priority ?? 'medium'] - PRIORITY_ORDER[b.priority ?? 'medium'];
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    <TaskContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        tasks: filteredAndSorted,
        totalCount,
        completedCount,
        pendingCount,
        progressPercent,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        priorityFilter,
        setPriorityFilter,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        clearCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);