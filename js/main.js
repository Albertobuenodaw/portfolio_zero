document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle')
  const themeIcon = document.getElementById('themeIcon')
  const clave = 'themeMode'
  const mql = window.matchMedia('(prefers-color-scheme: dark)')

  function aplicarTema(mode) {
    const efectivoDark = mode === 'dark' || (mode === 'system' && mql.matches)
    document.body.classList.toggle('light', !efectivoDark)
    themeIcon.textContent = efectivoDark ? '🌙' : '☀️'
  }

  function obtenerModo() {
    return localStorage.getItem(clave) || 'system'
  }

  function guardarModo(mode) {
    localStorage.setItem(clave, mode)
  }

  function alternarModo() {
    const actual = obtenerModo()
    const siguiente = actual === 'system' ? 'light' : actual === 'light' ? 'dark' : 'system'
    guardarModo(siguiente)
    aplicarTema(siguiente)
  }

  mql.addEventListener('change', () => {
    if (obtenerModo() === 'system') aplicarTema('system')
  })

  aplicarTema(obtenerModo())

  if (themeToggle) {
    themeToggle.addEventListener('click', alternarModo)
  }

  const botonMenu = document.getElementById('menu-toggle')
  const menuMovil = document.getElementById('menu-mobile')

  function cerrarMenu() {
    menuMovil.classList.remove('active')
    botonMenu.setAttribute('aria-expanded', 'false')
  }

  function alternarMenu() {
    const expandido = botonMenu.getAttribute('aria-expanded') === 'true'
    menuMovil.classList.toggle('active', !expandido)
    botonMenu.setAttribute('aria-expanded', String(!expandido))
  }

  function manejarClickEnlace(e) {
    if (e.target.closest('a')) cerrarMenu()
  }

  function manejarClickExterior(e) {
    if (!menuMovil.contains(e.target) && !botonMenu.contains(e.target)) cerrarMenu()
  }

  function manejarEscape(e) {
    if (e.key === 'Escape') cerrarMenu()
  }

  function inicializarMenuMovil() {
    if (!botonMenu || !menuMovil) return
    botonMenu.addEventListener('click', alternarMenu)
    menuMovil.addEventListener('click', manejarClickEnlace)
    document.addEventListener('click', manejarClickExterior)
    document.addEventListener('keydown', manejarEscape)
  }

  inicializarMenuMovil()
})