document.addEventListener('DOMContentLoaded', () => {
  async function setLanguage(lang) {
    const res = await fetch(`lang/${lang}.json`);
    const dict = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Cambia el atributo lang del html para accesibilidad
    document.documentElement.lang = lang;
  }

  // Selecciona todos los selectores de idioma (desktop y mobile)
  document.querySelectorAll('.lang-switcher, #langSwitcher').forEach(langSwitcher => {
    langSwitcher.addEventListener('change', e => {
      setLanguage(e.target.value);
      // Sincroniza todos los selectores al cambiar
      document.querySelectorAll('.lang-switcher, #langSwitcher').forEach(sel => {
        if (sel !== e.target) sel.value = e.target.value;
      });
    });
    // Inicializa con el idioma seleccionado o español
    setLanguage(langSwitcher.value || 'es');
  });
});