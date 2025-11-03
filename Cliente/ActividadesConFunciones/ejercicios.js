"use strict";

// ! CON ESTA FUNCION PODEMOS VER TODO LO QUE SUCEDE EN LA CONSOLA DEL NAVEGADOR.
(function (window, document) {
  let consoleBox = document.getElementById("console");

  function escapeHtml(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function writeLine(text, className) {
    let line = document.createElement("div");
    line.className = "log-line" + (className ? " " + className : "");
    line.innerHTML = escapeHtml(text);
    consoleBox.appendChild(line);
    consoleBox.scrollTop = consoleBox.scrollHeight;
  }

  function writeSep(n) {
    writeLine("--- Ejercicio " + n + " ---", "sep");
  }

  // ! Método JSON.stringify convierte un objeto o valor de JavaScript en una cadena de texto JSON.

  //  Ejercicios 
  function ejercicio1() {
    writeSep(1);
    let nums = [4.7, 2.3, 9.8, 6.5];
    let palabra = "JavaScript";

    let redondeados = nums.map(Math.ceil);
    writeLine("a) Redondeados -> " + JSON.stringify(redondeados), "ok");

    let longitudes = nums.map(function (n) { return String(n).length; });
    writeLine("b) Longitudes -> " + JSON.stringify(longitudes), "ok");

    let mayor = Math.max.apply(null, nums);
    let menor = Math.min.apply(null, nums);
    writeLine("c) Mayor: " + mayor + " | Menor: " + menor, "ok");

    writeLine("String MAYUS: " + palabra.toUpperCase(), "code");
    writeLine("Primeros 4: " + palabra.slice(0, 4), "code");
    writeLine("Contiene 'S' (mayúscula) " + palabra.includes("S"), "code");
  }

  function ejercicio2() {
    writeSep(2);

    function saludar(nombre) { return "Hola, " + nombre + "!"; }
    function esPar(n) { return n % 2 === 0; }
    function operacionArray(arr, cb) {
      let out = [];
      for (let i = 0; i < arr.length; i++) out.push(cb(arr[i]));
      return out;
    }
    function promedio(arr) {
      if (arr.length === 0) return 0;
      let suma = arr.reduce(function (a, b) { return a + b; }, 0);
      return suma / arr.length;
    }

    writeLine(saludar("Papasito"), "ok");
    writeLine("Es par(4): " + esPar(4) + " | Es par(3): " + esPar(3), "ok");
    writeLine("Operacion Array([1,2,3], x=>x*2): " + JSON.stringify(operacionArray([1,2,3], function (x) { return x * 2; })), "ok");
    writeLine("Promedio([2,4,6,8]): " + promedio([2,4,6,8]), "ok");
  }

  function ejercicio3() {
    writeSep(3);
    let frutas = ["Manzana", "Pera", "Plátano", "Melocotón", "Kiwi"];

    frutas.unshift("Fresa");
    frutas.push("Naranja");
    writeLine("Después añadir inicio/fin: " + JSON.stringify(frutas), "ok");

    frutas.shift();
    frutas.pop();
    writeLine("Tras eliminar primera/última: " + JSON.stringify(frutas), "ok");

    let frutasMayus = frutas.map(function (f) { return f.toUpperCase(); });
    writeLine("Mayúsculas: " + JSON.stringify(frutasMayus), "ok");

    let conA = frutas.filter(function (f) { return f.toLowerCase().includes("a"); });
    writeLine('Contienen "a": ' + JSON.stringify(conA), "ok");

    let idxManzana = frutas.findIndex(function (f) { return f.toLowerCase() === "manzana"; });
    writeLine('Índice de "Manzana": ' + idxManzana, "ok");

    let algunaP = frutas.some(function (f) { return f.charAt(0) === "P"; });
    let todasMas3 = frutas.every(function (f) { return f.length > 3; });
    writeLine("Alguna empieza por P? " + algunaP + " | Todas >3 letras? " + todasMas3, "ok");

    let ordenadas = frutas.slice().sort(function (a, b) { return a.localeCompare(b); });
    writeLine("Ordenadas: " + JSON.stringify(ordenadas), "ok");

    let cadena = frutas.join(", ");
    writeLine("Reduce (join) -> " + cadena, "ok");
  }

  function ejercicio4() {
    writeSep(4);
    let nums = [1, 4, 7, 10, 15];

    let resultado = nums
      .filter(function (n) { return n > 5; })
      .map(function (n) { return n * 2; })
      .reduce(function (acc, v) { return acc + v; }, 0);

    writeLine("Resultado (filtrar>5, *2, sumar): " + resultado, "ok");

    let usuarios = [{ nombre: "Ana", edad: 23 }, { nombre: "Luis", edad: 19 }, { nombre: "Marta", edad: 30 }];
    let nombres = usuarios
      .filter(function (u) { return u.edad > 20; })
      .map(function (u) { return u.nombre; })
      .sort(function (a, b) { return a.localeCompare(b); });

    writeLine("Nombres >20 ordenados: " + JSON.stringify(nombres), "ok");
  }

  function ejercicio5() {
    writeSep(5);
    let productos = [
      { nombre: "Teclado", precio: 50, stock: 10 },
      { nombre: "Ratón", precio: 20, stock: 0 },
      { nombre: "Monitor", precio: 200, stock: 5 },
      { nombre: "USB", precio: 10, stock: 25 }
    ];

    function productosConStock(arr) { return arr.filter(function (p) { return p.stock > 0; }); }
    function incrementarPrecio(arr, pct) {
      return arr.map(function (p) {
        return { nombre: p.nombre, precio: Number((p.precio * (1 + pct / 100)).toFixed(2)), stock: p.stock };
      });
    }
    function valorInventario(arr) { return arr.reduce(function (tot, p) { return tot + p.precio * p.stock; }, 0); }

    let conStock = productosConStock(productos);
    let conAumento = incrementarPrecio(conStock, 10);
    let total = valorInventario(conAumento);

    writeLine("Productos con stock: " + JSON.stringify(conStock), "code");
    writeLine("Tras +10%: " + JSON.stringify(conAumento), "code");
    writeLine("Valor total inventario tras +10%: " + total, "ok");
  }

  function ejercicio6() {
    writeSep(6);
    let estudiantes = [
      { nombre: "Ana", nota: 9 },
      { nombre: "Luis", nota: 4 },
      { nombre: "Marta", nota: 7 },
      { nombre: "Pedro", nota: 5 },
      { nombre: "Sara", nota: 9 }
    ];

    let ordenDesc = estudiantes.slice().sort(function (a, b) { return b.nota - a.nota; });
    writeLine("Ordenados por nota (desc): " + JSON.stringify(ordenDesc), "code");

    let todosAprobados = estudiantes.every(function (e) { return e.nota >= 5; });
    let algunoMatr = estudiantes.some(function (e) { return e.nota >= 9; });
    writeLine("Todos aprobados? " + todosAprobados + " | Alguno matrícula? " + algunoMatr, "ok");

    let agrupado = estudiantes.reduce(function (acc, e) {
      acc[e.nota] = acc[e.nota] || [];
      acc[e.nota].push(e);
      return acc;
    }, {});
    writeLine("Agrupados por nota: " + JSON.stringify(agrupado), "code");

    let formato = estudiantes.map(function (e) { return e.nombre + " - " + e.nota; });
    writeLine("Formato Nombre - Nota: " + JSON.stringify(formato), "ok");
  }

  function ejercicio7() {
    writeSep(7);
    let tareas = [
      { id: 1, titulo: "Estudiar JavaScript", completada: false },
      { id: 2, titulo: "Comprar pan", completada: true },
      { id: 3, titulo: "Hacer ejercicio", completada: false }
    ];

    function generarId(arr) {
      if (arr.length === 0) return 1;
      return Math.max.apply(null, arr.map(function (t) { return t.id; })) + 1;
    }
    function agregarTarea(arr, titulo) {
      return arr.concat({ id: generarId(arr), titulo: titulo, completada: false });
    }
    function completarTarea(arr, id) {
      return arr.map(function (t) { return t.id === id ? { id: t.id, titulo: t.titulo, completada: true } : t; });
    }
    function eliminarTarea(arr, id) {
      return arr.filter(function (t) { return t.id !== id; });
    }
    function obtenerPendientes(arr) { return arr.filter(function (t) { return !t.completada; }); }
    function contarCompletadas(arr) { return arr.reduce(function (c, t) { return c + (t.completada ? 1 : 0); }, 0); }

    writeLine("Inicial: " + JSON.stringify(tareas), "code");
    let withNew = agregarTarea(tareas, "Leer capítulo 3");
    writeLine("Tras agregar: " + JSON.stringify(withNew), "code");
    let marked = completarTarea(withNew, 1);
    writeLine("Tras completar id 1: " + JSON.stringify(marked), "code");
    writeLine("Pendientes: " + JSON.stringify(obtenerPendientes(marked)), "ok");
    writeLine("Completadas (count): " + contarCompletadas(marked), "ok");
    writeLine("Tras eliminar id 2: " + JSON.stringify(eliminarTarea(marked, 2)), "code");
  }

  // ! controlador: runAll & step
  function runAll() {
    consoleBox.innerHTML = "";
    ejercicio1(); ejercicio2(); ejercicio3(); ejercicio4(); ejercicio5(); ejercicio6(); ejercicio7();
  }

  let timer = null;
  let pasos = [ejercicio1, ejercicio2, ejercicio3, ejercicio4, ejercicio5, ejercicio6, ejercicio7];
  function runStep() {
    if (timer) { clearInterval(timer); timer = null; return; }
    consoleBox.innerHTML = "";
    let i = 0;
    timer = setInterval(function () {
      if (i >= pasos.length) { clearInterval(timer); timer = null; return; }
      pasos[i++]();
    }, 1000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    let btnAll = document.getElementById("runAllBtn");
    let btnClear = document.getElementById("clearBtn");
    let btnStep = document.getElementById("runStepBtn");
    if (btnAll) btnAll.addEventListener("click", runAll);
    if (btnClear) btnClear.addEventListener("click", function () { consoleBox.innerHTML = ""; });
    if (btnStep) btnStep.addEventListener("click", runStep);
    window.runAll = runAll;
    window.runStep = runStep;
  });
})(window, document);
