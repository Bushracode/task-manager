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

  useEffect(() => {
    localStorage.setItem('react_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('react_user', JSON.stringify(user));
  }, [user]);

  const addTask = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
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

  const loginUser = (name) => setUser({ name, isAuthenticated: true });
  const logoutUser = () => setUser({ name: '', isAuthenticated: false });

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <TaskContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        tasks: filteredTasks,
        totalCount: tasks.length,
        filter,
        setFilter,
        addTask,
        toggleTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);