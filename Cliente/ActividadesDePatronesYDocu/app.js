"use strict";

import TaskManager from './taskManager.js';
import ElementoUIFactory from './elementoUIFactory.js';


// Obtenemos la instancia única del gestor y creamos la fábrica
let manager = TaskManager.getInstance();
let factory = new ElementoUIFactory();


// Observador: muestra la lista de tareas por consola usando toString()
function actualizarListaConsola() {
    console.group('Lista de tareas');
    let tareas = manager.obtenerTareas();
    if (tareas.length === 0) console.log('(sin tareas)');
    tareas.forEach((t) => console.log(t.toString(), `id:${t.id}`));
    console.groupEnd();
}


// Observador: muestra el contador de tareas
function mostrarContador() {
    console.log(`Tareas totales: ${manager.obtenerTareas().length}`);
}


// UI: renderiza la lista <ul> limpiando y creando elementos mediante la fábrica
let ul = document.getElementById('listaTareas');
function renderUI() {
    // limpiamos la lista
    ul.innerHTML = '';
    let tareas = manager.obtenerTareas();
    if (tareas.length === 0) {
        let li = document.createElement('li');
        li.textContent = 'No hay tareas. Añade una tarea para empezar.';
        ul.appendChild(li);
        return;
    }


    // Creamos elementos detallados para cada tarea y los añadimos al ul
    tareas.forEach((t) => {
        let el = factory.crearElementoTarea(t, 'detallado');
        ul.appendChild(el);
    });
}


// Suscribimos los observadores al TaskManager
manager.suscribir(actualizarListaConsola);
manager.suscribir(mostrarContador);
manager.suscribir(renderUI);


// Formulario para añadir tareas: toma el input y lo manda al manager
let form = document.getElementById('formTarea');
let input = document.getElementById('inputTarea');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let texto = input.value.trim();
    if (!texto) return;
    manager.agregarTarea(texto);
    input.value = '';
    input.focus();
});


// Botón demo: añade varias tareas de ejemplo
let btnAddDemo = document.getElementById('btnAddDemo');
btnAddDemo.addEventListener('click', () => {
    manager.agregarTarea('Comprar pan');
    manager.agregarTarea('Estudiar DAW');
    manager.agregarTarea('Hacer backup');
});


// Botón limpiar todo: usa el método auxiliar del manager
let btnClearAll = document.getElementById('btnClearAll');
btnClearAll.addEventListener('click', () => {
    manager._eliminarTodo();
});


// Comprobación rápida de que el Singleton funciona
console.log('TaskManager singleton OK?', TaskManager.getInstance() === manager);


// Render inicial de la UI
renderUI();