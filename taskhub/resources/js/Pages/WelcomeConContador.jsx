// 1. Importamos el Hook useState
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function WelcomeConContador() {
    const nombreUsuario = "Ismael Vargas";
    
    // 2. Definimos el estado de tareas
    const [tareas, setTareas] = useState([
        "Instalar Laravel", 
        "Configurar React", 
        "Aprender Tailwind"
    ]);

    // TAREA 1: Contador que empieza en 0
    const [contador, setContador] = useState(0);

    // TAREA 2: Función para añadir tarea e incrementar contador
    const añadirTarea = () => {
        if (contador < 10) {
            const nueva = "Nueva tarea de prueba " + (tareas.length + 1);
            // Creamos un nuevo array con las antiguas + la nueva
            setTareas([...tareas, nueva]);
            // Incrementamos el contador
            setContador(contador + 1);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-black text-indigo-600 uppercase">
                TaskHub de {nombreUsuario}
            </h1>
            
            <p className="text-slate-500 mt-2 font-medium">
                Hoy es: {new Date().toLocaleDateString()}
            </p>

            {/* TABLA CON SCROLL FLEXIBLE */}
            <div className="mt-8 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-slate-800">
                    Tareas de hoy ({tareas.length}):
                </h2>
                
                {/* TERNARIO - Con scroll si hay muchas tareas */}
                <div className="max-h-96 overflow-y-auto">
                    <ul className="space-y-3">
                        {tareas.map((tarea, index) => (
                            <li 
                                key={index} 
                                className={`flex items-center gap-3 p-2 bg-slate-50 rounded-lg ${
                                    tarea.includes("Laravel") ? "text-blue-600 font-bold" : "text-slate-800"
                                }`}
                            >
                                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                                {tarea}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mostrar el contador de tareas añadidas */}
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-slate-600 text-center">Tareas añadidas:</p>
                    <p className="text-2xl font-bold text-indigo-600 text-center">{contador}</p>
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                {/* TAREA 3: Botón que cambia a rojo cuando contador >= 10 */}
                <button 
                    onClick={añadirTarea}
                    disabled={contador >= 10}
                    className={`${
                        contador >= 10 
                            ? 'bg-red-500 cursor-not-allowed opacity-75' 
                            : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95'
                    } text-white px-6 py-2 rounded-lg shadow-md transition`}
                >
                    {contador >= 10 ? '¡Lista Llena!' : 'Añadir Tarea Aleatoria'}
                </button>

                <Link 
                    href="/"
                    className="bg-slate-500 text-white px-6 py-2 rounded-lg hover:bg-slate-600 transition"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}