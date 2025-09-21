document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los toggles de tema (desktop y mobile)
  const themeToggles = document.querySelectorAll('.theme-toggle, #themeToggle');
  const themeIcons = document.querySelectorAll('.theme-icon, #themeIcon');
  const clave = 'themeMode';
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const nav = document.querySelector('.navbar');

  function setNavH() {
    if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  setNavH();
  window.addEventListener('resize', setNavH);

  function aplicarTema(mode) {
    const efectivoDark = mode === 'dark' || (mode === 'system' && mql.matches);
    document.body.classList.toggle('light', !efectivoDark);
    themeIcons.forEach(icon => {
      icon.textContent = efectivoDark ? '🌙' : '☀️';
    });
  }

  function obtenerModo() {
    return localStorage.getItem(clave) || 'system';
  }

  function guardarModo(mode) {
    localStorage.setItem(clave, mode);
  }

  function alternarModo() {
    const actual = obtenerModo();
    const siguiente = actual === 'system' ? 'light' : actual === 'light' ? 'dark' : 'system';
    guardarModo(siguiente);
    aplicarTema(siguiente);
  }

  mql.addEventListener('change', () => {
    if (obtenerModo() === 'system') aplicarTema('system');
  });

  aplicarTema(obtenerModo());

  // Añade el evento a todos los toggles de tema
  themeToggles.forEach(btn => {
    btn.addEventListener('click', alternarModo);
  });

  const botonMenu = document.getElementById('menu-toggle');
  const menuMovil = document.getElementById('menu-mobile');

  function cerrarMenu() {
    menuMovil.classList.remove('active');
    botonMenu.setAttribute('aria-expanded', 'false');
  }

  function alternarMenu() {
    const expandido = botonMenu.getAttribute('aria-expanded') === 'true';
    menuMovil.classList.toggle('active', !expandido);
    botonMenu.setAttribute('aria-expanded', String(!expandido));
  }

  function manejarClickEnlace(e) {
    if (e.target.closest('a')) cerrarMenu();
  }

  function manejarClickExterior(e) {
    if (!menuMovil.contains(e.target) && !botonMenu.contains(e.target)) cerrarMenu();
  }

  function manejarEscape(e) {
    if (e.key === 'Escape') cerrarMenu();
  }

  function inicializarMenuMovil() {
    if (!botonMenu || !menuMovil) return;
    botonMenu.addEventListener('click', alternarMenu);
    menuMovil.addEventListener('click', manejarClickEnlace);
    document.addEventListener('click', manejarClickExterior);
    document.addEventListener('keydown', manejarEscape);
  }
  
  function inicializarMenuMovil() {
  if (!botonMenu || !menuMovil) return;
  botonMenu.addEventListener('click', () => {
    alternarMenu();
    // Vuelve a añadir el listener al toggle de tema en el menú móvil cada vez que se abre
    menuMovil.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.onclick = alternarModo;
    });
  });
  menuMovil.addEventListener('click', manejarClickEnlace);
  document.addEventListener('click', manejarClickExterior);
  document.addEventListener('keydown', manejarEscape);
}

  inicializarMenuMovil();
});