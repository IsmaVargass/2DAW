"use strict";

import Tarea from './tarea.js';

// Gestor central de tareas que implementa Singleton y patrón Observer
export default class TaskManager {
    // Instancia estática para el Singleton
    static instance = null;

    // Devuelve la instancia única de TaskManager
    static getInstance() {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    // Constructor: inicializa el array de tareas y observadores
    constructor() {
        // Si ya existe una instancia, la devolvemos para reforzar el Singleton
        if (TaskManager.instance) return TaskManager.instance;

        // Array que contiene las instancias de Tarea
        this.tareas = [];

        // Array con callbacks (observadores) que se llaman al cambiar el estado
        this.observadores = [];

        TaskManager.instance = this;
    }

    // Añade una nueva tarea al gestor y notifica a los observadores
    agregarTarea(texto) {
        let t = new Tarea(texto);
        this.tareas.push(t);
        this.notificar();
        return t;
    }

    // Elimina una tarea por su id; devuelve true si se eliminó
    eliminarTarea(id) {
        let idx = this.tareas.findIndex((t) => t.id === id);
        if (idx === -1) return false;
        this.tareas.splice(idx, 1);
        this.notificar();
        return true;
    }

    // Devuelve una copia del array de tareas para evitar modificaciones externas
    obtenerTareas() {
        return [...this.tareas];
    }

    // Marca una tarea como completada por id y notifica
    marcarTareaComoCompletada(id) {
        let tarea = this.tareas.find((t) => t.id === id);
        if (!tarea) return false;
        tarea.completar();
        this.notificar();
        return true;
    }

    // Añade un observador (callback) a la lista
    suscribir(observador) {
        if (typeof observador !== 'function') return;
        this.observadores.push(observador);
    }

    // Ejecuta todos los observadores registrados, protegiendo contra errores
    notificar() {
        this.observadores.forEach((f) => {
            try {
                f();
            } catch (err) {
                // Si un observador falla, registramos el error y continuamos
                console.error('Error en observador:', err);
            }
        });
    }

    // Método auxiliar para borrar todas las tareas (útil para pruebas)
    _eliminarTodo() {
        this.tareas = [];
        this.notificar();
    }
}
