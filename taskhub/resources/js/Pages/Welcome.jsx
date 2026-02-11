import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-black text-indigo-600 uppercase tracking-widest">
                TaskHub De Ismael Vargas
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
                Aprendiendo Laravel + React para DAW
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full px-4">
                <Link
                    href="/actividad"
                    className="w-full bg-rose-600 text-white py-4 rounded-xl shadow-lg hover:bg-rose-700 transition font-bold uppercase tracking-wider text-center active:scale-95"
                >
                    Acceder CRUD
                </Link>

                <Link
                    href="/tareas"
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition font-bold uppercase tracking-wider text-center active:scale-95"
                >
                    Ver Listado
                </Link>

                <Link
                    href="/contador"
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition font-bold uppercase tracking-wider text-center active:scale-95"
                >
                    Ver Contador
                </Link>

                <Link
                    href="/persistencia"
                    className="w-full bg-violet-600 text-white py-4 rounded-xl shadow-lg hover:bg-violet-700 transition font-bold uppercase tracking-wider text-center active:scale-95"
                >
                    Ver Persistencia
                </Link>
            </div>
        </div>
    );
}