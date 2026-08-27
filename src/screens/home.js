import { store } from '../utils/store.js';
import { router } from '../utils/router.js';
import { formatCurrency, getInitials, timeAgo } from '../utils/helpers.js';
import { renderHeader } from '../components/header.js';
import { renderCarousel } from '../components/carousel.js';
import { setActiveNav } from '../components/navbar.js';

export function renderHome() {
  renderHeader();
  setActiveNav('home');
  const container = document.getElementById('screen-container');
  const user = store.getUser();
  const primary = user.bankAccounts.find(a => a.isPrimary);
  const contacts = store.getContacts();
  const txns = store.getTransactions().slice(0, 5);
  const balVisible = store.get('balanceVisible');

  container.innerHTML = `
    <div class="home-search">
      <div class="search-bar" id="home-search">
        <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <span>Search contacts, bills, UPI ID...</span>
      </div>
    </div>

    <div class="balance-section animate-slide-up">
      <div class="balance-card">
        <div class="balance-bank"><span class="bank-dot"></span> ${primary.bank} • ${primary.accountNo}</div>
        <div class="balance-amount" id="balance-display">
          ${balVisible ? formatCurrency(primary.balance) : '₹ ••••••'}
        </div>
        <div class="balance-actions">
          <button class="balance-action-btn" id="toggle-balance-btn">
            <svg viewBox="0 0 24 24"><path d="${balVisible ? 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' : 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'}"/></svg>
            ${balVisible ? 'Hide' : 'Show'} Balance
          </button>
          <button class="balance-action-btn" id="add-money-btn">+ Add Money</button>
        </div>
      </div>
    </div>

    <div class="section" style="animation:slideUp 0.4s ease 0.1s forwards;opacity:0">
      <div class="section-title">Transfer Money</div>
      <div class="transfer-grid stagger-children">
        <div class="transfer-item" data-action="send">
          <div class="transfer-icon" style="background:#ede9fe">💸</div>
          <div class="transfer-label">To Mobile</div>
        </div>
        <div class="transfer-item" data-action="send-bank">
          <div class="transfer-icon" style="background:#dbeafe">🏦</div>
          <div class="transfer-label">To Bank/UPI</div>
        </div>
        <div class="transfer-item" data-action="self">
          <div class="transfer-icon" style="background:#d1fae5">🔄</div>
          <div class="transfer-label">To Self</div>
        </div>
        <div class="transfer-item" data-action="check">
          <div class="transfer-icon" style="background:#fef3c7">💰</div>
          <div class="transfer-label">Check Balance</div>
        </div>
      </div>
    </div>

    <div class="section" style="animation:slideUp 0.4s ease 0.15s forwards;opacity:0">
      <div class="section-title">People <span class="see-all" id="see-all-contacts">See All</span></div>
      <div class="people-row">
        ${contacts.map(c => `
          <div class="people-item" data-contact-id="${c.id}">
            <div class="avatar" style="background:${c.color}">${getInitials(c.name)}</div>
            <div class="people-name truncate">${c.name.split(' ')[0]}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="promo-section" style="animation:slideUp 0.4s ease 0.2s forwards;opacity:0">
      <div id="promo-carousel"></div>
    </div>

    <div class="section" style="animation:slideUp 0.4s ease 0.25s forwards;opacity:0">
      <div class="section-title">Recharge & Bills</div>
      <div class="action-grid stagger-children">
        <div class="action-item"><div class="action-icon" style="background:#ede9fe">📱</div><div class="action-label">Mobile Recharge</div></div>
        <div class="action-item"><div class="action-icon" style="background:#dbeafe">📡</div><div class="action-label">DTH</div></div>
        <div class="action-item"><div class="action-icon" style="background:#fef3c7">⚡</div><div class="action-label">Electricity</div></div>
        <div class="action-item"><div class="action-icon" style="background:#fee2e2">💳</div><div class="action-label">Credit Card</div></div>
        <div class="action-item"><div class="action-icon" style="background:#d1fae5">🚰</div><div class="action-label">Water</div></div>
        <div class="action-item"><div class="action-icon" style="background:#fce7f3">🔥</div><div class="action-label">Gas</div></div>
        <div class="action-item"><div class="action-icon" style="background:#e0e7ff">📺</div><div class="action-label">Broadband</div></div>
        <div class="action-item"><div class="action-icon" style="background:#f3e8ff">🏠</div><div class="action-label">Rent</div></div>
      </div>
    </div>

    <div class="divider-thick"></div>

    <div class="section" style="animation:slideUp 0.4s ease 0.3s forwards;opacity:0">
      <div class="section-title">Financial Services</div>
      <div class="action-grid">
        <div class="action-item"><div class="action-icon" style="background:#fef3c7">🪙</div><div class="action-label">Gold</div></div>
        <div class="action-item"><div class="action-icon" style="background:#dbeafe">📈</div><div class="action-label">Mutual Funds</div></div>
        <div class="action-item"><div class="action-icon" style="background:#d1fae5">🛡️</div><div class="action-label">Insurance</div></div>
        <div class="action-item"><div class="action-icon" style="background:#ede9fe">💵</div><div class="action-label">Loans</div></div>
      </div>
    </div>

    <div class="divider-thick"></div>

    <div class="section" style="animation:slideUp 0.4s ease 0.35s forwards;opacity:0">
      <div class="section-title">Recent Transactions <span class="see-all" id="see-all-txns">See All</span></div>
      <div class="card">
        ${txns.length ? txns.map(t => `
          <div class="txn-item">
            <div class="avatar avatar-sm" style="background:${t.type==='received'?'var(--success)':'var(--primary)'}">${t.type==='received'?'↓':'↑'}</div>
            <div class="txn-info">
              <div class="txn-name">${t.name}</div>
              <div class="txn-detail">${timeAgo(t.date)} • ${t.category}</div>
            </div>
            <div class="txn-amount">
              <div class="amount ${t.type==='received'?'credit':'debit'}">${t.type==='received'?'+':'−'} ${formatCurrency(t.amount)}</div>
              <div class="status" style="color:${t.status==='success'?'var(--success)':'var(--error)'}">${t.status}</div>
            </div>
          </div>
        `).join('') : '<div class="history-empty"><p>No transactions yet</p></div>'}
      </div>
    </div>
    <div style="height:20px"></div>
  `;

  // Events
  document.getElementById('toggle-balance-btn')?.addEventListener('click', () => { store.toggleBalance(); renderHome(); });
  document.getElementById('see-all-txns')?.addEventListener('click', () => router.navigate('history'));
  document.getElementById('see-all-contacts')?.addEventListener('click', () => router.navigate('send'));

  document.querySelectorAll('[data-action="send"], [data-action="send-bank"]').forEach(el => {
    el.addEventListener('click', () => router.navigate('send'));
  });
  document.querySelectorAll('[data-contact-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = Number(el.dataset.contactId);
      router.navigate('send', { contactId: id });
    });
  });

  // Carousel
  renderCarousel([
    { bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)', html: '<h3 style="font-size:18px;font-weight:800">₹100 Cashback 🎉</h3><p style="font-size:13px;opacity:0.9;margin-top:4px">On your first UPI transaction</p>' },
    { bg: 'linear-gradient(135deg,#059669,#34d399)', html: '<h3 style="font-size:18px;font-weight:800">Recharge & Save 📱</h3><p style="font-size:13px;opacity:0.9;margin-top:4px">Get 5% cashback on mobile recharge</p>' },
    { bg: 'linear-gradient(135deg,#d97706,#fbbf24)', html: '<h3 style="font-size:18px;font-weight:800">Invest in Gold 🪙</h3><p style="font-size:13px;opacity:0.9;margin-top:4px">Start with just ₹1 on PhonePe</p>' },
  ], 'promo-carousel');
}
