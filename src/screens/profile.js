import { store } from '../utils/store.js';
import { renderHeader } from '../components/header.js';
import { setActiveNav } from '../components/navbar.js';
import { showToast } from '../components/toast.js';

export function renderProfile() {
  renderHeader('Profile');
  setActiveNav('profile');
  const container = document.getElementById('screen-container');
  const user = store.getUser();

  container.innerHTML = `
    <div class="profile-screen animate-fade-in">
      <div class="profile-header">
        <div class="profile-avatar-large">${user.avatar}</div>
        <div class="profile-name">${user.name}</div>
        <div class="profile-phone">${user.phone}</div>
        <div class="profile-upi">UPI: ${user.upiId}</div>
      </div>

      <div class="profile-section">
        <div class="section-title" style="font-size:var(--font-sm);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px">Bank Accounts</div>
        ${user.bankAccounts.map(a => `
          <div class="profile-menu-item">
            <div class="profile-menu-icon" style="background:${a.isPrimary?'#dbeafe':'#f3f4f6'}">🏦</div>
            <div class="profile-menu-text">
              <div class="title">${a.bank}</div>
              <div class="subtitle">${a.accountNo} ${a.isPrimary?'• Primary':''}</div>
            </div>
            <span class="profile-menu-arrow">›</span>
          </div>
        `).join('')}
      </div>

      <div class="divider-thick"></div>

      <div class="profile-section">
        <div class="section-title" style="font-size:var(--font-sm);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.5px">Settings</div>
        ${[
          {icon:'🔔',title:'Notifications',sub:'Manage alerts'},
          {icon:'🌙',title:'Dark Mode',sub:'Coming soon',toggle:true},
          {icon:'🌐',title:'Language',sub:'English'},
          {icon:'🔒',title:'Security',sub:'PIN, Biometric'},
          {icon:'❓',title:'Help & Support',sub:'FAQs, Contact us'},
          {icon:'ℹ️',title:'About',sub:'Version 4.0.0'},
        ].map(item => `
          <div class="profile-menu-item" data-setting="${item.title}">
            <div class="profile-menu-icon" style="background:var(--bg-secondary)">${item.icon}</div>
            <div class="profile-menu-text">
              <div class="title">${item.title}</div>
              <div class="subtitle">${item.sub}</div>
            </div>
            <span class="profile-menu-arrow">›</span>
          </div>
        `).join('')}
      </div>

      <div class="divider-thick"></div>

      <div class="profile-section" style="padding-bottom:var(--space-2xl)">
        <button class="btn btn-outline btn-full" id="reset-btn" style="color:var(--error);border-color:var(--error)">Reset App Data</button>
      </div>
    </div>`;

  document.querySelectorAll('[data-setting]').forEach(el => {
    el.addEventListener('click', () => showToast(`${el.dataset.setting} - Coming soon`, 'info'));
  });

  document.getElementById('reset-btn')?.addEventListener('click', () => {
    store.reset();
    showToast('App data reset!', 'success');
    setTimeout(() => location.reload(), 1000);
  });
}
