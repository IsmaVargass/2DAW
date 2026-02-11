<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('WelcomeCRUD', [
            'tasks' => Task::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        Task::create($validated);

        return back()->with('message', 'Tarea creada con éxito');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'is_completed' => 'sometimes|boolean',
            'description' => 'nullable|string|max:1000',
        ]);

        $task->update($validated);

        return back()->with('message', 'Tarea actualizada con éxito');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return back()->with('message', 'Tarea eliminada con éxito');
    }
}
