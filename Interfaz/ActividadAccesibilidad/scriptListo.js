const formulario = document.getElementById('formulario-contacto');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(event) {
    event.preventDefault();
    
    const todosLosGrupos = document.querySelectorAll('.form-group');
    todosLosGrupos.forEach(grupo => {
        grupo.classList.remove('error');
        const errorSpan = grupo.querySelector('.error');
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    });
    
    let esValido = true;
    let primerCampoConError = null;
    
    const nombre = document.getElementById('nombre');
    if (nombre.value.trim() === '') {
        mostrarError('nombre', 'Por favor, introduce tu nombre');
        esValido = false;
        if (!primerCampoConError) primerCampoConError = nombre;
    }
    
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        mostrarError('email', 'Por favor, introduce un email válido');
        esValido = false;
        if (!primerCampoConError) primerCampoConError = email;
    }
    
    const mensaje = document.getElementById('mensaje');
    if (mensaje.value.trim() === '') {
        mostrarError('mensaje', 'Por favor, escribe tu mensaje');
        esValido = false;
        if (!primerCampoConError) primerCampoConError = mensaje;
    }
    
    if (!esValido) {
        if (primerCampoConError) {
            primerCampoConError.focus();
        }
        return false;
    }
    
    alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.');
    formulario.reset();
    return true;
}

function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    const grupo = campo.closest('.form-group');
    const errorSpan = document.getElementById(campoId + '-error');
    
    grupo.classList.add('error');
    
    if (errorSpan) {
        errorSpan.textContent = mensaje;
        errorSpan.style.display = 'block';
    }
}

document.querySelectorAll('input, textarea').forEach(campo => {
    campo.addEventListener('input', function() {
        const grupo = this.closest('.form-group');
        if (grupo && grupo.classList.contains('error')) {
            grupo.classList.remove('error');
            const errorSpan = grupo.querySelector('.error');
            if (errorSpan) {
                errorSpan.style.display = 'none';
            }
        }
    });
});