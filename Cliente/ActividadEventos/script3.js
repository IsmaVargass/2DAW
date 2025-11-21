"use strict";

/**
 * Referencias globales a los elementos del DOM.
 */
let form = document.getElementById('form-inscripcion');
let nombreInput = document.getElementById('nombre');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let errorNombre = document.getElementById('error-nombre');
let errorEmail = document.getElementById('error-email');
let errorPassword = document.getElementById('error-password');

let selectEntrada = document.getElementById('tipo-entrada');
let checkboxesTaller = document.querySelectorAll('input[name="taller"]');
let resumenTotal = document.getElementById('resumen-total');

//! DEFINICIÓN DE EXPRESIONES REGULARES

/**
 * Regex para validar email estándar.
 * @type {RegExp}
 */
let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Requisitos: Mínimo 8 caracteres, al menos 1 mayúscula y 1 número.
 * (?=.*\d) -> Busca al menos un dígito.
 * (?=.*[A-Z]) -> Busca al menos una mayúscula.
 * .{8,} -> Longitud mínima de 8.
 * @type {RegExp}
 */
let regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/; // * REGEX CONTRASEÑA


//! FUNCIONES DE VALIDACIÓN 

/**
 * Valida si el nombre no está vacío.
 * Muestra error visual si falla.
 * @returns {boolean} true si es válido, false si no.
 */
function validarNombre() {
    if (nombreInput.value.trim() === "") {
        mostrarError(nombreInput, errorNombre, "El nombre no puede estar vacío.");
        return false;
    } else {
        limpiarError(nombreInput, errorNombre);
        return true;
    }
}

/**
 * Valida si el email cumple con la Regex.
 * Muestra error visual si falla.
 * @returns {boolean} true si es válido, false si no.
 */
function validarEmail() {
    if (!regexEmail.test(emailInput.value)) {
        mostrarError(emailInput, errorEmail, "Por favor, introduce un email válido.");
        return false;
    } else {
        limpiarError(emailInput, errorEmail);
        return true;
    }
}

/**
 * Valida si la contraseña cumple con los requisitos de seguridad (Regex).
 * Muestra error visual si falla.
 * @returns {boolean} true si es válido, false si no.
 */
function validarPassword() {
    if (!regexPassword.test(passwordInput.value)) {
        mostrarError(passwordInput, errorPassword, "Debe tener 8 caracteres, 1 mayúscula y 1 número.");
        return false;
    } else {
        limpiarError(passwordInput, errorPassword);
        return true;
    }
}

/**
 * Función auxiliar para mostrar errores en el DOM.
 * Añade la clase .error al input y texto al span.
 * @param {HTMLElement} inputElement - El input que falló.
 * @param {HTMLElement} spanElement - El span donde se mostrará el mensaje.
 * @param {string} mensaje - El texto del error.
 */
function mostrarError(inputElement, spanElement, mensaje) {
    inputElement.classList.add('error');
    spanElement.textContent = mensaje;
}

/**
 * Función auxiliar para limpiar errores en el DOM.
 * @param {HTMLElement} inputElement 
 * @param {HTMLElement} spanElement 
 */
function limpiarError(inputElement, spanElement) {
    inputElement.classList.remove('error');
    spanElement.textContent = "";
}


//! LISTENERS DE VALIDACIÓN (Blur e Input) 

/**
 * Listener 'blur' para Nombre: Valida al salir del campo.
 */
nombreInput.addEventListener('blur', validarNombre);

/**
 * Listener 'blur' para Email: Valida al salir del campo.
 */
emailInput.addEventListener('blur', validarEmail);

/**
 * Listener 'input' para Contraseña: Valida en tiempo real mientras se escribe.
 */
passwordInput.addEventListener('input', validarPassword);


//! CÁLCULO DINÁMICO DE COSTE 

/**
 * Calcula el coste total sumando el valor del select y los checkboxes marcados.
 * Actualiza el texto en el DOM.
 */
function actualizarTotal() {
    let total = 0;

    // Sumar valor del select (convertir string a entero)
    total += parseInt(selectEntrada.value);

    // Recorrer checkboxes y sumar si están checked
    checkboxesTaller.forEach(checkbox => {
        if (checkbox.checked) {
            total += parseInt(checkbox.value);
        }
    });

    resumenTotal.textContent = `Total a Pagar: ${total}€`;
}

/**
 * Listeners 'change' para recalcular el precio cuando cambian las opciones.
 */
selectEntrada.addEventListener('change', actualizarTotal);

checkboxesTaller.forEach(checkbox => {
    checkbox.addEventListener('change', actualizarTotal);
});


//! GESTIÓN DEL ENVÍO (SUBMIT) 

/**
 * Maneja el evento submit del formulario.
 * Previene el envío real, valida todo de nuevo y muestra el resultado final.
 * @param {Event} event - El evento submit.
 */
form.addEventListener('submit', (event) => {
    // 1. Prevenir recarga de página
    event.preventDefault();

    // 2. Ejecutar todas las validaciones manualmente
    let esNombreValido = validarNombre();
    let esEmailValido = validarEmail();
    let esPasswordValido = validarPassword();

    // 3. Comprobar si TODO es válido
    if (esNombreValido && esEmailValido && esPasswordValido) {
        // Éxito: Ocultar formulario y mostrar mensaje
        form.style.display = "none";
        
        let mensajeExito = document.createElement('h2');
        mensajeExito.textContent = "¡Inscripción completada!";
        document.body.appendChild(mensajeExito);
    } 
    // Si algo falla, no hacemos nada (los mensajes de error ya se mostraron en las funciones de validar)
});