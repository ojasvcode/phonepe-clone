import { router } from '../utils/router.js';

const navItems = [
  { id:'home', label:'Home', icon:'<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' },
  { id:'history', label:'History', icon:'<svg viewBox="0 0 24 24"><path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>' },
  { id:'scan', label:'Scan', isScan:true, icon:'<svg viewBox="0 0 24 24"><path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5z"/></svg>' },
  { id:'rewards', label:'Rewards', icon:'<svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 00-3-3c-1.05 0-1.95.56-2.47 1.37L12 4.13l-.53-.76C10.95 2.56 10.05 2 9 2a3 3 0 00-3 3c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>' },
  { id:'profile', label:'Profile', icon:'<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' },
];

let currentActive = 'home';

export function renderNavbar() {
  const nav = document.getElementById('bottom-nav');
  nav.innerHTML = `<div class="bottom-nav">${navItems.map(item => {
    if (item.isScan) {
      return `<button class="nav-scan-btn" data-nav="${item.id}">${item.icon}</button>`;
    }
    return `<button class="nav-item ${currentActive===item.id?'active':''}" data-nav="${item.id}">
      ${item.icon}<span>${item.label}</span>
    </button>`;
  }).join('')}</div>`;

  nav.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.nav;
      router.navigate(id);
    });
  });
}

export function setActiveNav(id) {
  currentActive = id;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.nav === id);
  });
}
