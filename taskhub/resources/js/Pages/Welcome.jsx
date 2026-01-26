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
            <div className="mt-6 flex gap-4">
                <Link
                    href="/tareas"
                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
                >
                    Ver Listado
                </Link>

                {/* 👇 NUEVO BOTÓN para el contador */}
                <Link
                    href="/contador"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Ver Contador
                </Link>

                <Link
                    href="/persistencia"
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-600 transition"
                >
                    Ver Persistencia
                </Link>
            </div>
        </div>
    );
}