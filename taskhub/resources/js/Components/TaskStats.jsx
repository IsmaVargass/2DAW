import React from 'react';
import { CheckCircle2, Circle, Activity } from 'lucide-react';

export default function TaskStats({ total, completed }) {
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-slate-800">{total}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
        <div className="p-3 bg-green-50 rounded-xl text-green-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Completadas</p>
          <p className="text-2xl font-bold text-slate-800">{completed}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center transition-all hover:shadow-md">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Progreso</p>
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {progress}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
