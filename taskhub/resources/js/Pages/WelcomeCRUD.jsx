import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ListTodo, Home } from 'lucide-react';
import TaskItem from '../Components/TaskItem';
import TaskStats from '../Components/TaskStats';

export default function WelcomeCRUD() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim().length > 0) {
      const newTask = {
        id: Date.now(),
        title: inputValue.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleUpdateTask = (id, newTitle) => {
    if (newTitle.trim().length > 0) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      ));
    }
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <>
      <Head title="Lista de Tareas" />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Botón volver al inicio */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm hover:shadow-md"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </Link>
          </div>

          {/* Título principal */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <ListTodo className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-slate-800">
                Lista de tareas pendientes
              </h1>
            </div>

            {/* Estadísticas */}
            <TaskStats
              total={totalTasks}
              completed={completedTasks}
              progress={progressPercentage}
            />
          </div>

          {/* Input y botón de añadir */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Añadir nueva tarea"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleAddTask}
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm hover:shadow-md"
              >
                Añadir
              </button>
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            {tasks.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <ListTodo className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No hay tareas aún. ¡Añade tu primera tarea!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {tasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onUpdate={handleUpdateTask}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Botón limpiar completadas */}
          {completedTasks > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleClearCompleted}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm hover:shadow-md"
              >
                Limpiar lista ({completedTasks} completada{completedTasks !== 1 ? 's' : ''})
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}