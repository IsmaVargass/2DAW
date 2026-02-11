import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Trash2, Edit2, Check, X, Circle, CheckCircle2 } from 'lucide-react';

export default function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const { data, setData, patch, delete: destroy, processing } = useForm({
    title: task.title,
    is_completed: task.is_completed,
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    patch(route('tasks.update', task.id), {
      data: { is_completed: !task.is_completed },
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
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      destroy(route('tasks.destroy', task.id), {
        preserveScroll: true,
      });
    }
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${task.is_completed ? 'bg-slate-50 opacity-75' : 'bg-white hover:bg-indigo-50/30'
      }`}>
      <button
        onClick={handleToggle}
        className={`transition-transform active:scale-90 ${task.is_completed ? 'text-green-500' : 'text-slate-300 hover:text-indigo-500'
          }`}
      >
        {task.is_completed ? (
          <CheckCircle2 className="w-6 h-6 fill-current" />
        ) : (
          <Circle className="w-6 h-6" />
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
              className="w-full px-3 py-1 text-slate-700 bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="flex gap-1">
              <button
                type="submit"
                disabled={processing}
                className="p-1 px-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setData('title', task.title);
                }}
                className="p-1 px-2 bg-slate-300 text-white rounded-md hover:bg-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <p className={`text-lg font-medium truncate transition-all ${task.is_completed ? 'text-slate-400 line-through' : 'text-slate-700'
            }`}>
            {task.title}
          </p>
        )}
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleDelete}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
