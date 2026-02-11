import React from 'react';

export default function TaskStats({ total, completed, variant = 'default' }) {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (variant === 'elegant') {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-10">
              <div>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1">Totales</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{total}</p>
              </div>
              <div className="w-px h-8 bg-slate-100"></div>
              <div>
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1">Éxitos</p>
                <p className="text-3xl font-black text-indigo-600 tracking-tighter">{completed}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rendimiento Actual</span>
                <span className="text-sm font-black text-slate-900">{progress}%</span>
              </div>
              <div className="relative h-1.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-indigo-600 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 min-w-[140px]">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Estado</span>
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all duration-500 ${progress === 100
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-100'
                : 'bg-white text-indigo-600 border-indigo-100 shadow-sm shadow-indigo-50'
              }`}>
              {progress === 100 ? 'Completado' : 'En Progreso'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default minimalist variant
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-light tracking-tighter text-slate-900">{completed}</span>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">{total}</span>
        </div>
        <span className="text-xs font-mono font-bold text-slate-400">{progress}%</span>
      </div>
      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="bg-slate-900 h-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
