"use strict";

/**
 * Referencias a los elementos del DOM.
 */
let emailInput = document.getElementById('email-input');
let emailFeedback = document.getElementById('email-feedback');

/**
 * Expresión regular para validar un email simple.
 * Formato esperado: texto + @ + texto + . + texto
 * @type {RegExp}
 */
let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ! REGEX EMAIL SIMPLE

/**
 * Listener para el evento 'input'.
 * Se ejecuta cada vez que el usuario modifica el valor del campo (escribir, borrar, pegar).
 * @param {InputEvent} event - El evento disparado por el input.
 */
emailInput.addEventListener('input', (event) => {
    let valor = event.target.value;

    // Si el campo está vacío, limpiamos las clases y el mensaje
    if (valor.trim() === "") {
        emailInput.classList.remove('valido', 'invalido');
        emailFeedback.textContent = "";
        emailFeedback.classList.remove('valido', 'invalido');
        return;
    }

    // Comprobamos si el valor cumple con la Regex usando el método test().
    let esValido = regexEmail.test(valor);

    if (esValido) {
        // Caso Válido
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        
        emailFeedback.textContent = "Email Válido";
        emailFeedback.classList.add('valido');
        emailFeedback.classList.remove('invalido');
    } else {
        // Caso Inválido
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        
        emailFeedback.textContent = "Email Inválido";
        emailFeedback.classList.add('invalido');
        emailFeedback.classList.remove('valido');
    }
});
