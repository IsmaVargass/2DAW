"use strict";

// Helper: escribe cabecera bonita en consola y en el div #salida
function printHeader(n) {
    let header = `--- EJERCICIO ${n} ---\n`;
    console.log(header.trim());
    document.getElementById('salida').textContent += header;
}

// EJERCICIO 1: Creación y acceso a objetos 
function ejercicio1() {
    printHeader(1);
    let persona = { nombre: 'Ana', edad: 28, trabajo: 'Ingeniera' };

    // Acceso con notación de punto
    console.log(`Nombre (dot): ${persona.nombre}`);
    document.getElementById('salida').textContent += `Nombre (dot): ${persona.nombre}\n`;
    console.log(`Edad (dot): ${persona.edad}`);
    document.getElementById('salida').textContent += `Edad (dot): ${persona.edad}\n`;

    // modificar: añadir pais y eliminar trabajo
    persona.pais = 'España';
    delete persona.trabajo;

    // ! Método JSON.stringify convierte un objeto o valor de JavaScript en una cadena de texto JSON.
    console.log('Objeto persona (después de cambios):', persona);
    document.getElementById('salida').textContent += 'Objeto persona (después de cambios): ' + JSON.stringify(persona) + '\n';

    // notación de corchetes
    console.log('Edad (brackets):', persona['edad']);
    document.getElementById('salida').textContent += 'Edad (brackets): ' + persona['edad'] + '\n\n';
}

// EJERCICIO 2: Operador "in" y bucle "for...in"
function ejercicio2() {
    printHeader(2);
    let persona = { nombre: 'Ana', edad: 28, pais: 'España' };

    console.log(`¿'nombre' está en persona? → ${'nombre' in persona}`);
    document.getElementById('salida').textContent += `¿'nombre' está en persona? → ${'nombre' in persona}\n`;
    console.log(`¿'apellido' está en persona? → ${'apellido' in persona}`);
    document.getElementById('salida').textContent += `¿'apellido' está en persona? → ${'apellido' in persona}\n`;

    console.log('Recorriendo propiedades con for...in:');
    document.getElementById('salida').textContent += 'Recorriendo propiedades con for...in:\n';
    for (let clave in persona) {
        console.log(`  ${clave} : ${persona[clave]}`);
        document.getElementById('salida').textContent += `  ${clave} : ${persona[clave]}\n`;
    }
    document.getElementById('salida').textContent += '\n';
}

// EJERCICIO 3: Referencias de objetos y clonación
function ejercicio3() {
    printHeader(3);
    let usuario1 = { nombre: 'Ismael', edad: 22, email: 'ismael@prueba.com' };

    // copia por referencia
    let usuario2 = usuario1;
    console.log('Antes de modificar usuario2:', usuario1, usuario2);
    document.getElementById('salida').textContent += 'Antes de modificar usuario2: ' + JSON.stringify(usuario1) + '\n';

    // cambio en la referencia (ahora sí distinto para que se vea el efecto)
    usuario2.edad = 23;
    console.log('Después de cambiar usuario2.edad = 23:', usuario1, usuario2);
    document.getElementById('salida').textContent += 'Después de cambiar usuario2.edad = 23: ' + JSON.stringify(usuario1) + '\n';

    // clon superficial con Object.assign
    let clon = Object.assign({}, usuario1);
    clon.nombre = 'ClonIsmael';
    console.log('Original y clon:', usuario1, clon);
    document.getElementById('salida').textContent += 'Original: ' + JSON.stringify(usuario1) + '\n' + 'Clon: ' + JSON.stringify(clon) + '\n\n';
}

// EJERCICIO 5: Métodos en objetos y uso de "this" 
function ejercicio5() {
    printHeader(5);
    // scope local para no contaminar el global
    (function scopeLocal() {
        function Car(name, model, year) {
            this.name = name;
            this.model = model;
            this.year = year;
        }
        let miCar = new Car('Ford', 'Focus', 2018);
        console.log('Instancia creada con constructor Car (local):', miCar);
        document.getElementById('salida').textContent += 'Instancia Car (local): ' + JSON.stringify(miCar) + '\n\n';
    })();
}

// EJERCICIO 6: Symbol y claves ocultas
function ejercicio6() {
    printHeader(6);
    let id = Symbol('id');
    let empleado = { nombre: 'Marta', puesto: 'Desarrolladora' };
    empleado[id] = 987654;

    console.log('Iterando con for...in (símbolos no aparecen):');
    document.getElementById('salida').textContent += 'Iterando con for...in (símbolos no aparecen):\n';
    for (let k in empleado) {
        console.log(`  ${k} : ${empleado[k]}`);
        document.getElementById('salida').textContent += `  ${k} : ${empleado[k]}\n`;
    }

    console.log('Acceso a propiedad con símbolo:', empleado[id]);
    document.getElementById('salida').textContent += 'Acceso a propiedad con símbolo: ' + empleado[id] + '\n';
    console.log('Claves propias:', Object.keys(empleado));
    console.log('Símbolos propios:', Object.getOwnPropertySymbols(empleado));
    document.getElementById('salida').textContent += 'Claves propias: ' + JSON.stringify(Object.keys(empleado)) + '\n';
    document.getElementById('salida').textContent += 'Símbolos propios: ' + JSON.stringify(Object.getOwnPropertySymbols(empleado)) + '\n\n';
}

// EJERCICIO 7: Conversión de objetos a valores primitivos
function ejercicio7() {
    printHeader(7);
    let cuentaBancaria = {
        saldo: 1000,
        toString() {
            return `Saldo: ${this.saldo} EUR`;
        }
    };
    console.log('Cuenta bancaria:', String(cuentaBancaria));
    document.getElementById('salida').textContent += 'Cuenta bancaria: ' + String(cuentaBancaria) + '\n\n';
}

// EJERCICIO 8: Herencia de Clases
function ejercicio8() {
    printHeader(8);
    class Vehicle {
        constructor(name) {
            this.name = name;
        }
        move() {
            console.log(`${this.name} se está moviendo`);
            document.getElementById('salida').textContent += `${this.name} se está moviendo\n`;
        }
    }

    class Car extends Vehicle {
        constructor(name, model) {
            super(name);
            this.model = model;
        }
        move() {
            console.log(`${this.name} is Rolling out!`);
            document.getElementById('salida').textContent += `${this.name} is Rolling out!\n`;
        }
        info() {
            console.log(`Nombre: ${this.name} — Modelo: ${this.model}`);
            document.getElementById('salida').textContent += `Nombre: ${this.name} — Modelo: ${this.model}\n`;
        }
    }

    let myCar = new Car('Toyota', 'BZ4X');
    myCar.move();
    myCar.info();
    document.getElementById('salida').textContent += '\n';
}

// EJERCICIO 9: Encapsulación con propiedades privadas (sin eval)
function ejercicio9() {
    printHeader(9);
    class CajaFuerte {
        #codigo;
        constructor(propietario, codigoInicial) {
            this.propietario = propietario;
            this.#codigo = codigoInicial;
        }
        verCodigo() {
            return this.#codigo;
        }
        cambiarCodigo(nuevoCodigo) {
            if (Number.isInteger(nuevoCodigo) && nuevoCodigo >= 1000 && nuevoCodigo <= 9999) {
                this.#codigo = nuevoCodigo;
                return true;
            } else {
                return false;
            }
        }
    }

    let miCaja = new CajaFuerte('Ana', 1234);
    console.log('miCaja.propietario:', miCaja.propietario);
    document.getElementById('salida').textContent += 'miCaja.propietario: ' + miCaja.propietario + '\n';
    console.log('miCaja.verCodigo():', miCaja.verCodigo());
    document.getElementById('salida').textContent += 'miCaja.verCodigo(): ' + miCaja.verCodigo() + '\n';

    let cambioOK = miCaja.cambiarCodigo(5678);
    console.log('Cambio a 5678 fue exitoso?', cambioOK);
    document.getElementById('salida').textContent += 'Cambio a 5678 fue exitoso? ' + cambioOK + '\n';
    console.log('miCaja.verCodigo() ahora:', miCaja.verCodigo());
    document.getElementById('salida').textContent += 'miCaja.verCodigo() ahora: ' + miCaja.verCodigo() + '\n';

    // Demostraciones seguras sin eval:
    // 1) intentar acceder por la "clave con hash" no funciona: miCaja['#codigo'] -> undefined
    console.log("miCaja['#codigo'] (no es lo mismo que campo privado):", miCaja['#codigo']);
    document.getElementById('salida').textContent += "miCaja['#codigo'] (no es lo mismo que campo privado): " + String(miCaja['#codigo']) + '\n';

    // 2) las claves enumerables y no enumerables públicas no listan el campo privado
    console.log('Object.keys(miCaja):', Object.keys(miCaja));
    document.getElementById('salida').textContent += 'Object.keys(miCaja): ' + JSON.stringify(Object.keys(miCaja)) + '\n';

    console.log('Object.getOwnPropertyNames(miCaja):', Object.getOwnPropertyNames(miCaja));
    document.getElementById('salida').textContent += 'Object.getOwnPropertyNames(miCaja): ' + JSON.stringify(Object.getOwnPropertyNames(miCaja)) + '\n';

    // 3) Reflect.ownKeys devuelve claves incluyendo símbolos, pero tampoco muestra campos privados
    console.log('Reflect.ownKeys(miCaja):', Reflect.ownKeys(miCaja));
    document.getElementById('salida').textContent += 'Reflect.ownKeys(miCaja): ' + JSON.stringify(Reflect.ownKeys(miCaja)) + '\n\n';

    // Conclusión práctica: la única forma legítima de obtener el código es mediante el método público verCodigo()
    document.getElementById('salida').textContent += 'Acceso legítimo con verCodigo(): ' + miCaja.verCodigo() + '\n\n';
}

// EJERCICIO 10: Objeto window, DOM y eventos 
function ejercicio10_setup() {
    // ! Nota: NO llamo a printHeader(10) aquí para evitar que aparezca al cargar la página.
    let boton = document.getElementById('saludar');
    let input = document.getElementById('nombre');
    let mensajesDiv = document.getElementById('mensajes');

    boton.addEventListener('click', function () {
        let nombre = input.value.trim() || 'invitado/a';
        let texto = `¡Hola ${nombre}! Bienvenido/a.`;

        // mostrar dentro del div (sin borrar anteriores)
        let node = document.createElement('div');
        node.className = 'message';
        node.textContent = texto;
        mensajesDiv.appendChild(node);

        // alert
        window.alert(texto);

        // ventana hija
        let child = window.open('', '_blank', 'width=400,height=200');
        if (child) {
            child.document.write(`<p style="font-family: Arial; padding: 20px;">Bienvenido/a, <strong>${nombre}</strong>.<br>Esta es la ventana hija.</p>`);
            child.document.title = 'Bienvenida';
        } else {
            console.log('No se pudo abrir la ventana hija (popup bloqueado).');
            document.getElementById('salida').textContent += 'No se pudo abrir la ventana hija (popup bloqueado).\n';
        }

        // desaparecer en 5s
        setTimeout(() => {
            if (node.parentNode) node.parentNode.removeChild(node);
        }, 5000);
    });
}

// runAll y setup 
function runAllExercises() {
    // limpiar salida
    document.getElementById('salida').textContent = '';
    // llamadas en orden; cada ejercicio pinta su cabecera con printHeader
    ejercicio1();
    ejercicio2();
    ejercicio3();
    ejercicio5();
    ejercicio6();
    ejercicio7();
    ejercicio8();
    ejercicio9();
    printHeader(10);
    // ejercicio 10 necesita interacción: dejamos instrucción visible
    document.getElementById('salida').textContent += 'Interacciona con la sección "Saludo Interactivo" en la página.\n\n';
    console.log('--- EJERCICIO 10 --- Interactúa con la sección "Saludo Interactivo" en la página.');
}

document.addEventListener('DOMContentLoaded', () => {
    ejercicio10_setup();
    let btn = document.getElementById('runAll');
    btn.addEventListener('click', runAllExercises);
});