// Menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

// Submenús (Secciones)
document.querySelectorAll('.has-submenu').forEach((item) => {
  const toggle = item.querySelector('.submenu-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

// Likes con contador (sin persistencia)
const likeButtons = document.querySelectorAll('.like-btn');
const counts = {}; // { id: number }

likeButtons.forEach((btn) => {
  const id = btn.getAttribute('data-like-id');
  if (!id) return;
  // inicializar contador desde el DOM
  const countEl = document.querySelector(`.like-count[data-like-id="${id}"]`);
  counts[id] = countEl ? parseInt(countEl.textContent || '0', 10) : 0;

  btn.addEventListener('click', () => {
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    // si estaba sin like, sumar; si estaba con like, restar (no negativo)
    if (!pressed) {
      counts[id] += 1;
    } else {
      counts[id] = Math.max(0, counts[id] - 1);
    }
    if (countEl) countEl.textContent = String(counts[id]);
  });
});

// Cerrar submenús si se hace click fuera (mejora UX)
document.addEventListener('click', (ev) => {
  const target = ev.target;
  const clickedInsideSubmenu = target.closest('.has-submenu');
  document.querySelectorAll('.has-submenu.open').forEach((openItem) => {
    if (openItem !== clickedInsideSubmenu) {
      const toggle = openItem.querySelector('.submenu-toggle');
      openItem.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
