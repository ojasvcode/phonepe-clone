import { store } from '../utils/store.js';
import { router } from '../utils/router.js';

const SVG = {
  search: '<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
};

export function renderHeader(title) {
  const header = document.getElementById('app-header');
  const user = store.getUser();
  const notifCount = store.get('notificationCount');

  if (title) {
    header.innerHTML = `
      <div class="app-header">
        <div class="header-left">
          <button class="header-icon-btn" id="header-back-btn">
            <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          </button>
          <span style="font-weight:600;font-size:var(--font-md)">${title}</span>
        </div>
        <div class="header-right"></div>
      </div>`;
    document.getElementById('header-back-btn')?.addEventListener('click', () => router.back());
    return;
  }

  header.innerHTML = `
    <div class="app-header">
      <div class="header-left">
        <div class="header-avatar" id="header-profile-btn">${user.avatar}</div>
        <div class="header-greeting">
          <span>${getGreeting()}, ${user.name}!</span>
        </div>
      </div>
      <div class="header-right">
        <button class="header-icon-btn" id="header-search-btn">${SVG.search}</button>
        <button class="header-icon-btn" id="header-bell-btn" style="position:relative">
          ${SVG.bell}
          ${notifCount > 0 ? `<span class="badge" style="position:absolute;top:-2px;right:-2px">${notifCount}</span>` : ''}
        </button>
      </div>
    </div>`;

  document.getElementById('header-profile-btn')?.addEventListener('click', () => router.navigate('profile'));
  document.getElementById('header-bell-btn')?.addEventListener('click', () => {
    store.set('notificationCount', 0);
    showToast('No new notifications', 'info');
  });
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function showToast(msg, type) {
  const event = new CustomEvent('toast', { detail: { message: msg, type } });
  window.dispatchEvent(event);
}
