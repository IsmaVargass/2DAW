import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { LayoutList, Plus, ChevronLeft, Inbox, CheckCircle2 } from 'lucide-react';
import TaskItem from '@/Components/TaskItem';
import TaskStats from '@/Components/TaskStats';

export default function WelcomeCRUD({ tasks }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.title.trim()) return;
    post(route('tasks.store'), {
      onSuccess: () => reset('title', 'description'),
      preserveScroll: true,
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.is_completed).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-700">
      <Head title="TaskHub - Ismael Vargas" />

      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/60">
          {/* Elegant Header */}
          <header className="flex items-center justify-between mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <LayoutList className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">TaskHub</h1>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mt-0.5">Gestión de Tareas</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-widest group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Volver
            </Link>
          </header>

          {/* Elegant Stats */}
          <div className="mb-16 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100">
            <TaskStats total={totalTasks} completed={completedTasks} variant="elegant" />
          </div>

          {/* Task Form */}
          <section className="mb-16 animate-in fade-in slide-in-from-top-4 duration-1000 delay-200">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                placeholder="¿Qué tienes en mente hoy?"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className={`w-full bg-white border border-slate-200/60 rounded-2xl py-5 pl-7 pr-16 text-slate-800 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/50 focus:outline-none transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)]`}
              />
              <button
                type="submit"
                disabled={processing || !data.title.trim()}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 disabled:opacity-20 disabled:grayscale transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="w-6 h-6" />
              </button>
            </form>
            {errors.title && <p className="text-[10px] uppercase tracking-wider font-bold text-red-400 mt-2.5 ml-7">{errors.title}</p>}
          </section>

          {/* Task List */}
          <section className="animate-in fade-in slide-in-from-top-4 duration-1000 delay-300">
            {tasks.length > 0 ? (
              <div className="bg-slate-50/50 rounded-3xl border border-slate-200/30 p-2 shadow-inner">
                <div className="divide-y divide-slate-100/50">
                  {tasks.map(task => (
                    <TaskItem key={task.id} task={task} variant="elegant" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-[2rem] border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Inbox className="w-7 h-7 text-slate-200" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Nada por aquí</h3>
                <p className="text-slate-400 text-sm mt-1 mx-auto max-w-xs px-6">Tu lista de objetivos está limpia. Tómate un respiro o crea uno nuevo.</p>
              </div>
            )}
          </section>

          {/* Elegant Footer */}
          <footer className="mt-24 pt-10 border-t border-slate-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sistema Operativo</span>
              </div>
              <div className="flex items-center gap-1.5 group cursor-default">
                <span className="text-[11px] font-medium text-slate-300">Desarrollado por</span>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">Ismael Vargas</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}