import React from 'react';
import { ListChecks, CheckCircle2, TrendingUp } from 'lucide-react';

export default function TaskStats({ total, completed, progress }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total de tareas */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-indigo-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Total de tareas
            </p>
            <p className="text-3xl font-bold text-slate-800">
              {total}
            </p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-lg">
            <ListChecks className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Tareas completadas */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">
              Completadas
            </p>
            <p className="text-3xl font-bold text-slate-800">
              {completed}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Porcentaje de progreso */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-amber-500">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">
              Progreso
            </p>
            <p className="text-3xl font-bold text-slate-800">
              {progress}%
            </p>
            {/* Barra de progreso */}
            <div className="mt-3 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="bg-amber-100 p-3 rounded-lg ml-3">
            <TrendingUp className="w-6 h-6 text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
