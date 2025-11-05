"use strict";

// Clase que representa una tarea simple: id, texto, completada y fecha de creación
export default class Tarea {
    // Constructor: inicializa las propiedades básicas de la tarea
    constructor(texto) {
        // id único basado en el timestamp
        this.id = Date.now().toString();


        // texto de la tarea
        this.texto = texto;


        // estado por defecto: no completada
        this.completada = false;


        // fecha de creación
        this.fechaCreacion = new Date();
    }


    // Marca la tarea como completada
    completar() {
        this.completada = true;
    }


    // Devuelve una representación textual de la tarea: [ ] o [x] + texto
    toString() {
        let tick = this.completada ? 'x' : ' ';
        return `[${tick}] ${this.texto}`;
    }
}