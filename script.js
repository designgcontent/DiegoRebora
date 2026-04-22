// --- ESTADOS INICIALES ---
let currentLang = 'en';
let currentPage = 'home';
let menuOpen = false;

// --- NAVEGACIÓN SPA CON TRANSICIÓN ---
function navigateTo(pageId) {
  currentPage = pageId;
  
  // 1. Ocultar todas las vistas y quitar el efecto
  const views = document.querySelectorAll('.view');
  views.forEach(view => {
    view.style.display = 'none';
    view.classList.remove('show-transition');
  });

  // 2. Mostrar la vista seleccionada
  const targetView = document.getElementById(`view-${pageId}`);
  if (!targetView) return; // Protección por si no encuentra la vista
  targetView.style.display = 'block';

  // 3. Forzar un "Reflow" del navegador para que la transición funcione
  void targetView.offsetWidth;

  // 4. Activar la transición (Sube la opacidad a 1 suavemente)
  targetView.classList.add('show-transition');

  // Actualizar la clase del body para cambiar fondos si fuera necesario
  document.body.classList.remove('page-home', 'page-about', 'page-contact');
  document.body.classList.add(`page-${pageId}`);

  // Actualizar el estado "activo" (negrita) de los enlaces del menú
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.dataset.target === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Cerrar menú mobile si estaba abierto al hacer clic en un enlace
  if (menuOpen) toggleMenu();
  
  // Volver arriba de la página
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

// --- INICIALIZAR LA WEB AL CARGAR ---
// Apenas cargue la web, simula un clic en "Home" para activar la animación inicial
window.addEventListener('DOMContentLoaded', () => {
  navigateTo('home');
});
