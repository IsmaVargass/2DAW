import React, { useState, useEffect, useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Trash2, Edit3, Check, X, Circle, CheckCircle2 } from 'lucide-react';

export default function TaskItem({ task, variant = 'default' }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const { data, setData, patch, delete: destroy, processing } = useForm({
    title: task.title,
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    router.patch(route('tasks.update', task.id), {
      is_completed: !task.is_completed
    }, {
      preserveScroll: true,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (data.title.trim() === '') return;

    patch(route('tasks.update', task.id), {
      onSuccess: () => setIsEditing(false),
      preserveScroll: true,
    });
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar objetivo?')) {
      destroy(route('tasks.destroy', task.id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <div className={`group flex items-center gap-5 p-5 transition-all duration-300 ${task.is_completed ? 'bg-slate-50/50' : 'hover:bg-slate-50/80'
      }`}>
      {/* Checkbox Toggle */}
      <button
        onClick={handleToggle}
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform active:scale-95 ${task.is_completed
            ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-100'
            : 'bg-white border-slate-300 text-transparent hover:border-indigo-400 group-hover:scale-105'
          }`}
        title={task.is_completed ? "Marcar como pendiente" : "Completar"}
      >
        {task.is_completed ? (
          <Check className="w-4 h-4 text-white stroke-[4]" />
        ) : (
          <Circle className="w-4 h-4 text-slate-200" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <form onSubmit={handleUpdate} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
            />
            <div className="flex gap-1">
              <button type="submit" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Check className="w-5 h-5" /></button>
              <button type="button" onClick={() => {
                setIsEditing(false);
                setData('title', task.title);
              }} className="p-2 text-slate-300 hover:bg-slate-100 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
          </form>
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`block truncate text-base font-bold transition-all cursor-pointer tracking-tight ${task.is_completed ? 'text-slate-400 line-through' : 'text-slate-700'
              }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {/* Action Icons - More visible and colorful */}
      <div className={`flex items-center gap-2 transition-all duration-300 ${isEditing ? 'hidden' : 'opacity-100'
        }`}>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2.5 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
          title="Editar"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
