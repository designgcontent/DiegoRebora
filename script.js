// --- ESTADOS INICIALES ---
let currentLang = 'en';
let currentPage = 'home';
let menuOpen = false;

// --- NAVEGACIÓN SPA ---
function navigateTo(pageId) {
  currentPage = pageId;
  
  // 1. Ocultar todas las vistas y quitar el efecto
  const views = document.querySelectorAll('.view');
  views.forEach(view => {
    view.style.display = 'none';
    view.classList.remove('show-transition');
  });

  // 2. Mostrar la vista seleccionada (Aún será invisible por la opacidad 0)
  const targetView = document.getElementById(`view-${pageId}`);
  targetView.style.display = 'block';

  // 3. Forzar un "Reflow" del navegador (Esto es clave para que funcione 'transition')
  void targetView.offsetWidth;

  // 4. Activar la transición (Sube la opacidad a 1)
  targetView.classList.add('show-transition');

  // Actualizar el estado "activo" de los enlaces del menú
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.dataset.target === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cerrar menú mobile si estaba abierto y volver arriba
  if (menuOpen) toggleMenu();
  window.scrollTo(0, 0);
}

// --- INICIALIZAR LA WEB AL CARGAR ---
// Dispara la función navigateTo('home') para que haga la transición inicial
window.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});
  
  // Actualizar la clase del body para mostrar la sección correcta
  document.body.classList.remove('page-home', 'page-about', 'page-contact');
  document.body.classList.add(`page-${pageId}`);

  // Actualizar el estado "activo" de los enlaces del menú
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.dataset.target === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cerrar menú mobile si estaba abierto y volver arriba
  if (menuOpen) toggleMenu();
  window.scrollTo(0, 0);
}

// --- CAMBIO DE IDIOMA ---
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  
  // Actualizar las clases del body para intercambiar los textos
  document.body.classList.remove('lang-en', 'lang-es');
  document.body.classList.add(`lang-${currentLang}`);
}

// --- MENÚ MOBILE ---
function toggleMenu() {
  menuOpen = !menuOpen;
  const menuEl = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (menuOpen) {
    menuEl.classList.add('open');
    iconMenu.style.display = 'none';
    iconClose.style.display = 'block';
  } else {
    menuEl.classList.remove('open');
    iconMenu.style.display = 'block';
    iconClose.style.display = 'none';
  }
}
