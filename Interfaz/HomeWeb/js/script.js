"use strict";

(function () {
  const THEME_KEY = 'estudio4-theme';
  const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let botonToggle = null;

  /* =====================================================
     FUNCIONES DE TEMA OSCURO / CLARO
  ===================================================== */
  function aplicarTema(nombre) {
    const esOscuro = nombre === 'dark';
    document.documentElement.classList.toggle('dark-mode', esOscuro);

    if (botonToggle) {
      botonToggle.setAttribute('aria-pressed', esOscuro);
      botonToggle.classList.toggle('is-dark', esOscuro);
    }

    const footerBottom = document.querySelectorAll(
      '.site-footer .col-12.text-muted.small, .site-footer .col-12.small.text-muted, .site-footer .col-12.text-muted, .site-footer .col-12'
    );
    footerBottom.forEach(el => el.classList.toggle('footer-bottom-dark', esOscuro));

    try { localStorage.setItem(THEME_KEY, nombre); } catch(e) {}
  }

  function obtenerTemaInicial() {
    try {
      const guardado = localStorage.getItem(THEME_KEY);
      if (guardado === 'dark' || guardado === 'light') return guardado;
    } catch(e){}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function crearOBuscarToggle() {
    const existente = document.getElementById('theme-toggle');
    if (existente) return existente;

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label','Alternar modo oscuro');
    btn.setAttribute('aria-pressed','false');
    btn.innerHTML = '<span class="visually-hidden">Alternar modo oscuro</span>' +
      '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path class="sun" d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.6 5.6 4 4l1.6-1.6M19.4 19.4 18 18l1.4 1.4M5.6 18.4 4 20l1.6 1.6M19.4 4.6 18 6l1.4-1.4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"></path>' +
      '<circle class="moon" cx="12" cy="12" r="4" fill="currentColor"></circle></svg>';

    const navContainer = document.querySelector('.navbar .container-fluid') || document.querySelector('.navbar');
    const toggler = document.querySelector('.navbar .navbar-toggler');
    if (navContainer) {
      if (toggler) navContainer.insertBefore(btn, toggler.nextSibling);
      else navContainer.appendChild(btn);
    } else {
      document.body.insertBefore(btn, document.body.firstChild);
    }
    return btn;
  }

  /* =====================================================
     FUNCIONES DE ANIMACIÓN
  ===================================================== */
  function nodosDesde(selectorONodos) {
    if (!selectorONodos) return [];
    if (typeof selectorONodos === 'string') return Array.from(document.querySelectorAll(selectorONodos));
    if (selectorONodos instanceof Node) return [selectorONodos];
    if (Array.isArray(selectorONodos) || NodeList.prototype.isPrototypeOf(selectorONodos)) return Array.from(selectorONodos);
    return [];
  }

  function fadeUp(destinos, opciones={}) {
    const nodos = nodosDesde(destinos);
    if (!nodos.length) return Promise.resolve();
    const {duracion=420, retraso=0, escalonado=80} = opciones;

    if (prefiereReducido) {
      nodos.forEach(n => { n.style.opacity='1'; n.style.transform='none'; });
      return Promise.resolve();
    }

    nodos.forEach((el,i) => {
      el.style.opacity='0';
      el.style.transform='translateY(10px)';
      el.style.transition=`opacity ${duracion}ms ease, transform ${duracion}ms ease`;
      el.style.transitionDelay=`${retraso + i*escalonado}ms`;
      requestAnimationFrame(()=>{ el.style.opacity='1'; el.style.transform='translateY(0)'; });
    });

    const total = retraso + (nodos.length-1)*escalonado + duracion + 40;
    return new Promise(res => setTimeout(res,total));
  }

  function slideInFromRight(destinos, opciones={}) {
    const nodos = nodosDesde(destinos);
    if (!nodos.length) return Promise.resolve();
    const {duracion=560, retraso=0} = opciones;

    if (prefiereReducido) {
      nodos.forEach(n=>{ n.style.opacity='1'; n.style.transform='none'; });
      return Promise.resolve();
    }

    nodos.forEach(el=>{
      el.style.opacity='0';
      el.style.transform='translateX(40px)';
      el.style.transition=`opacity ${duracion}ms cubic-bezier(.2,.9,.2,1), transform ${duracion}ms cubic-bezier(.2,.9,.2,1)`;
      el.style.transitionDelay=`${retraso}ms`;
      requestAnimationFrame(()=>{ el.style.opacity='1'; el.style.transform='translateX(0)'; });
    });

    return new Promise(res=>setTimeout(res,duracion+retraso+40));
  }

  function ejecutarAnimacionesEntrada() {
    const logo = document.querySelector('.navbar-brand img');
    const enlacesNav = Array.from(document.querySelectorAll('.navbar .nav-link'));
    const heroText = document.querySelector('.hero-text');

    const secuencia = Promise.resolve()
      .then(()=> logo? fadeUp(logo,{duracion:420,retraso:120}):Promise.resolve())
      .then(()=> fadeUp(enlacesNav,{duracion:420,escalonado:80}))
      .then(()=> slideInFromRight(heroText,{duracion:560,retraso:160}))
      .finally(()=> document.body.classList.add('is-loaded'));

    if (prefiereReducido) document.body.classList.add('is-loaded');

    return secuencia;
  }

  /* =====================================================
     IntersectionObserver para fade-up y fade-right en scroll
  ===================================================== */
  function initFadeScroll() {
    const elementosFade = document.querySelectorAll('.fade-up, .fade-right');
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('show');
      });
    }, {threshold:0.2});

    // ✅ Aquí estaba el error: usar la variable correcta
    elementosFade.forEach(el=>observer.observe(el));
  }

  /* =====================================================
     INICIALIZACIÓN
  ===================================================== */
  document.addEventListener('DOMContentLoaded',()=>{
    botonToggle = crearOBuscarToggle();
    aplicarTema(obtenerTemaInicial());

    botonToggle.addEventListener('click',()=>{
      const siguiente = document.documentElement.classList.contains('dark-mode')?'light':'dark';
      aplicarTema(siguiente);
    });

    botonToggle.addEventListener('keydown',ev=>{
      if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); botonToggle.click(); }
    });

    ejecutarAnimacionesEntrada();
    initFadeScroll();
  });

})();
