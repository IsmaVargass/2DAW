<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta principal - Página de bienvenida estática
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'mensaje' => '¡Ánimo, hoy es un gran día para programar!',
    ]);
});

// Ruta de tareas - Página dinámica con lista de tareas
Route::get('/tareas', function () {
    return Inertia::render('WelcomeDinamico');
});

Route::get('/contador', function () {
    return Inertia::render('WelcomeConContador');
});

Route::get('/test', function () {
    return Inertia::render('Test');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';