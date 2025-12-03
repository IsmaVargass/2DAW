// Ejercicio 1: Selección de Elementos -- SE MUESTRA POR CONSOLA ESTE EJERCICIO.
const tituloPrincipal = document.getElementById('titulo-principal');
const primerSubtitulo = document.querySelector('.subtitulo');
const imagenesThumbs = document.querySelectorAll('img.thumb');
const btnAddTask = document.getElementById('btn-add-task');

console.log(tituloPrincipal.textContent);
console.log(primerSubtitulo.textContent);
console.log(imagenesThumbs);
console.log(btnAddTask.textContent);

// -- TODOS ESTOS EJERCICIOS ESTÁN REALIZADOS EN EL ARCHIVO index.html --

// Ejercicio 2: El Interruptor
const btnToggle = document.getElementById('btn-toggle');
const lightBulb = document.getElementById('light-bulb');

btnToggle.addEventListener('click', function() {
    lightBulb.classList.toggle('luz-apagada');
    lightBulb.classList.toggle('luz-encendida');
});

// Ejercicio 3: Editor de Perfil
const profileName = document.querySelector('.profile-name');
const profileDesc = document.querySelector('.profile-desc');
const profileCard = document.getElementById('profile-card');

profileName.textContent = 'Ismael Vargas';
profileDesc.textContent = 'Estudiante de 2º de DAW';
profileCard.setAttribute('data-user-id', 'DWEC-001');

// Ejercicio 4: Galería de Imágenes
const mainImage = document.getElementById('main-image');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
        mainImage.src = thumb.src;
    });
});

// Ejercicio 5: Añadir Tareas
const inputNewTask = document.getElementById('input-new-task');

btnAddTask.addEventListener('click', function() {
    const valor = inputNewTask.value;
    
    if (valor !== '') {
        const nuevoLi = document.createElement('li');
        nuevoLi.textContent = valor;
        
        const taskList = document.getElementById('task-list');
        taskList.appendChild(nuevoLi);
        
        inputNewTask.value = '';
    }
});

// Ejercicio 6: El Modal
const modal = document.getElementById('modal');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');

btnOpenModal.addEventListener('click', function() {
    modal.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', function() {
    modal.classList.add('hidden');
});

// Ejercicio 7: Notificación Avanzada
const statusBox = document.getElementById('status-box');
statusBox.innerHTML = '<strong>Estado:</strong> <span class="status-success">Conectado</span>';

setTimeout(function() {
    const statusSpan = document.querySelector('.status-success');
    statusSpan.classList.remove('status-success');
    statusSpan.classList.add('status-error');
    statusSpan.textContent = 'Desconectado';
}, 3000);

// Ejercicio 8: Preguntas Teóricas

/*

EJERCICIO 8: PREGUNTAS TEÓRICAS

1. ¿Por qué es preferible usar elemento.classList.add('mi-clase') en lugar de elemento.style.color = 'blue'?

Es preferible usar classList porque:
- Separa la presentación (CSS) de la lógica (JavaScript), siguiendo el principio de separación de capas.
- Permite reutilizar estilos definidos en el CSS, manteniendo la consistencia visual.
- Es más fácil de mantener: si necesitamos cambiar el color, solo modificamos el CSS.
- Permite aplicar múltiples estilos a la vez con una sola clase.
- Mejora la legibilidad del código y facilita el trabajo en equipo.


2. ¿Cuál es la forma estándar de añadir un evento a un botón? ¿Por qué es mejor que onclick="miFuncion()" en el HTML?

La forma estándar es usar addEventListener:
elemento.addEventListener('click', function() { ... });

Es mejor que onclick="" porque:
- COMPATIBILIDAD: addEventListener es el estándar W3C soportado por todos los navegadores modernos de forma consistente.
- SEPARACIÓN DE CAPAS : Mantiene el JavaScript separado del HTML, facilitando el mantenimiento.
- MÚLTIPLES EVENTOS: Permite asociar varios eventos del mismo tipo al mismo elemento.
- MEJOR CONTROL: Permite usar opciones avanzadas como capture, once, passive, etc.
- BUENAS PRÁCTICAS: El código es más limpio, organizado y profesional.

*/
