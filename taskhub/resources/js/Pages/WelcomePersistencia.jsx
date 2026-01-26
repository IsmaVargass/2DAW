import { Link } from '@inertiajs/react';

export default function WelcomePersistencia({ tasks }) {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-black text-indigo-600 uppercase tracking-widest mb-6">
                Lista de Tareas (Persistencia)
            </h1>

            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Mis Tareas de la Base de Datos</h2>

                {tasks.length === 0 ? (
                    <p className="text-gray-500 italic">No hay tareas creadas aún.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasks.map(task => (
                            <li key={task.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg text-indigo-700">{task.title}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${task.is_completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {task.is_completed ? 'Completada' : 'Pendiente'}
                                    </span>
                                </div>
                                {task.description && (
                                    <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
                                )}
                                <div className="text-xs text-gray-400 mt-2">
                                    Creado: {new Date(task.created_at).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-8">
                <Link
                    href="/"
                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
                >
                    &larr; Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
