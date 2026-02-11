<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TaskController;
use App\Models\Task;

// Ruta principal - Página de bienvenida estática
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Nueva ruta para la actividad de la fase 6
Route::get('/actividad', [TaskController::class, 'index'])->name('welcome.crud');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

// Ruta de tareas - Página dinámica con lista de tareas
Route::get('/tareas', function () {
    return Inertia::render('WelcomeDinamico');
});

Route::get('/contador', function () {
    return Inertia::render('WelcomeConContador');
});


Route::get('/persistencia', function () {
    return Inertia::render('WelcomePersistencia', [
        'tasks' => Task::all()
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';