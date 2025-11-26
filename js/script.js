// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

// Submenú desplegable
document.querySelectorAll('.has-submenu').forEach(group => {
  const toggle = group.querySelector('.submenu-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      group.classList.toggle('open');
    });
  }
});

// Mecanismo de "like" con persistencia simple en localStorage
const LIKE_KEY = 'proyecto-like-counts';

function getLikeMap() {
  try {
    return JSON.parse(localStorage.getItem(LIKE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLikeMap(map) {
  localStorage.setItem(LIKE_KEY, JSON.stringify(map));
}

// Inicializar botones de like
function initLikes() {
  const map = getLikeMap();

  document.querySelectorAll('.like-btn').forEach(btn => {
    const id = btn.dataset.itemId;
    if (!id) return;

    // Estado inicial
    const countEl = btn.querySelector('.count');
    const data = map[id] || { count: 0, pressed: false };

    countEl.textContent = String(data.count);
    btn.setAttribute('aria-pressed', data.pressed ? 'true' : 'false');

    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      const nextPressed = !pressed;

      // Actualiza conteo (sumar al presionar, restar al despresionar)
      data.count = Math.max(0, data.count + (nextPressed ? 1 : -1));
      data.pressed = nextPressed;

      // UI
      countEl.textContent = String(data.count);
      btn.setAttribute('aria-pressed', nextPressed ? 'true' : 'false');

      // Guardar
      map[id] = data;
      saveLikeMap(map);
    });
  });
}

document.addEventListener('DOMContentLoaded', initLikes);
