import { Link } from "@inertiajs/react";

export default function Welcome({ mensaje }) {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
            <p className="text-green-600 font-semibold text-lg mb-4">
                {mensaje}
            </p>

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

                <Link
                    href="/contador"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    Ver Contador
                </Link>
            </div>
        </div>
    );
}
