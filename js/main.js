// main.js
// Aquí puedes agregar funcionalidades JS en el futuro.

// Modo oscuro/claro
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    themeIcon.textContent = '🌙';
    // Forzar actualización de fondo
    document.body.style.background = getComputedStyle(document.body).getPropertyValue('--bg');
  } else {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
    themeIcon.textContent = '☀️';
    document.body.style.background = getComputedStyle(document.body).getPropertyValue('--bg');
  }
  localStorage.setItem('theme', mode);
}

function toggleTheme() {
  const current = document.body.classList.contains('dark') ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// Inicializar tema
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else {
    // Preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}