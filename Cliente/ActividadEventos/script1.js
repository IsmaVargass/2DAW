"use strict";

// Referencias a los elementos del DOM necesarios para el ejercicio.
let zonaMouse = document.getElementById('zona-mouse');
let inputTexto = document.getElementById('input-texto');
let logLista = document.getElementById('log');

/**
 * Añade un mensaje al registro de logs y desplaza el scroll hacia abajo.
 * @param {string} mensaje - Texto que se añadirá a la lista de logs.
 */
function log(mensaje) {
    let li = document.createElement('li');
    li.textContent = `> ${mensaje}`;
    logLista.appendChild(li);
    // Mantiene el scroll siempre abajo para ver el último mensaje
    logLista.scrollTop = logLista.scrollHeight;
}

//! EVENTOS DE RATÓN

/**
 * Evento mouseenter: Se ejecuta cuando el ratón entra en el área del div.
 * Añade la clase 'highlight' y registra el evento.
 */
zonaMouse.addEventListener('mouseenter', () => {
    zonaMouse.classList.add('highlight');
    log("Ratón Entró");
});

/**
 * Evento mouseleave: Se ejecuta cuando el ratón sale del área del div.
 * Quita la clase 'highlight' y registra el evento.
 */
zonaMouse.addEventListener('mouseleave', () => {
    zonaMouse.classList.remove('highlight');
    log("Ratón Salió");
});

/**
 * Evento click: Se ejecuta al hacer clic en el div.
 */
zonaMouse.addEventListener('click', () => {
    log("Clic");
});

/**
 * Evento mousemove: Se ejecuta al mover el ratón dentro del div.
 * Muestra las coordenadas relativas al elemento.
 * @param {MouseEvent} event - Objeto con información de coordenadas.
 */
zonaMouse.addEventListener('mousemove', (event) => {
    // offsetX y offsetY dan la posición relativa al elemento, no a la página
    log(`Ratón moviéndose en X: ${event.offsetX}, Y: ${event.offsetY}`);
});

//! EVENTOS DE TECLADO 

/**
 * Evento focus: Se ejecuta cuando el input recibe el foco.
 */
inputTexto.addEventListener('focus', () => {
    log("Input enfocado");
});

/**
 * Evento blur: Se ejecuta cuando el input pierde el foco.
 */
inputTexto.addEventListener('blur', () => {
    log("Input desenfocado");
});

/**
 * Evento keydown: Se ejecuta al pulsar una tecla.
 * @param {KeyboardEvent} event - Información sobre la tecla presionada.
 */
inputTexto.addEventListener('keydown', (event) => {
    log(`Tecla pulsada: ${event.key}`);
});

/**
 * Evento keyup: Se ejecuta al soltar una tecla.
 * @param {KeyboardEvent} event - Información sobre el código físico de la tecla.
 */
inputTexto.addEventListener('keyup', (event) => {
    log(`Tecla soltada: ${event.code}`);
});
