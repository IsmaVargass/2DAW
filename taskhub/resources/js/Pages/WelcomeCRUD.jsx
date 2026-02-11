import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutList, Plus, Home, Inbox } from 'lucide-react';
import TaskItem from '@/Components/TaskItem';
import TaskStats from '@/Components/TaskStats';

export default function WelcomeCRUD({ tasks }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.store'), {
      onSuccess: () => reset('title', 'description'),
      preserveScroll: true,
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.is_completed).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Head title="TaskHub - CRUD Tareas" />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <LayoutList className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">TaskHub CRUD</h1>
              <p className="text-slate-500 font-medium">Gestión de tareas persistente con Laravel</p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>

        {/* Stats Section */}
        <TaskStats total={totalTasks} completed={completedTasks} />

        {/* Create Task Form */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="¿Qué hay que hacer hoy?"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.title ? 'border-red-300 focus:ring-red-500' : 'border-slate-100 focus:ring-indigo-500'} rounded-2xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all`}
              />
              <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <button
              type="submit"
              disabled={processing || !data.title.trim()}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Añadir Tarea
            </button>
          </form>
          {errors.title && <p className="mt-2 text-sm text-red-500 font-medium ml-12">{errors.title}</p>}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
              {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="bg-white py-16 px-8 rounded-3xl shadow-sm border border-slate-100 text-center">
              <div className="inline-flex p-4 bg-slate-50 rounded-2xl text-slate-300 mb-4">
                <Inbox className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-1">Sin tareas pendientes</h3>
              <p className="text-slate-400">Todo está al día. ¡Buen trabajo!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}