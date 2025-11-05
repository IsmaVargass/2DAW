"use strict";

import TaskManager from './taskManager.js';


// Fábrica que crea elementos DOM para representar tareas en distintos formatos
export default class ElementoUIFactory {
    // Crea y devuelve un elemento DOM representando la tarea
    crearElementoTarea(tarea, tipo = 'simple') {
        // Si pedimos el tipo simple, devolvemos un <li> con el texto
        if (tipo === 'simple') {
            let li = document.createElement('li');
            li.textContent = tarea.toString();
            li.dataset.id = tarea.id;
            return li;
        }


        // Para el tipo 'detallado' construimos un contenedor con checkbox, texto, fecha y botón
        let cont = document.createElement('div');
        cont.className = 'tarea-detal';
        cont.dataset.id = tarea.id;


        // Checkbox para marcar completada (delegamos la acción al TaskManager)
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completada;
        checkbox.setAttribute('aria-label', 'Marcar completada');


        // Si el usuario cambia el checkbox, pedimos al TaskManager que marque la tarea
        checkbox.addEventListener('change', () => {
            TaskManager.getInstance().marcarTareaComoCompletada(tarea.id);
        });


        // Span con el texto de la tarea
        let texto = document.createElement('span');
        texto.textContent = tarea.texto;


        // Small con la fecha de creación en formato local
        let fecha = document.createElement('small');
        fecha.textContent = tarea.fechaCreacion.toLocaleString();


        // Botón para eliminar la tarea
        let btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            TaskManager.getInstance().eliminarTarea(tarea.id);
        });


        // Componemos el contenedor y lo devolvemos
        cont.appendChild(checkbox);
        cont.appendChild(texto);
        cont.appendChild(fecha);
        cont.appendChild(btnEliminar);


        return cont;
    }
}