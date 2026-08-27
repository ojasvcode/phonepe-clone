import { store } from '../utils/store.js';
import { formatCurrency, timeAgo, groupByDate, getInitials } from '../utils/helpers.js';
import { renderHeader } from '../components/header.js';
import { setActiveNav } from '../components/navbar.js';

export function renderHistory() {
  renderHeader('Transaction History');
  setActiveNav('history');
  const container = document.getElementById('screen-container');
  let filter = 'all';

  function render() {
    let txns = store.getTransactions();
    if (filter === 'sent') txns = txns.filter(t => t.type === 'sent');
    else if (filter === 'received') txns = txns.filter(t => t.type === 'received');
    else if (filter === 'failed') txns = txns.filter(t => t.status === 'failed');

    const grouped = groupByDate(txns);

    container.innerHTML = `
      <div class="history-screen animate-fade-in">
        <div class="history-filters">
          ${['all','sent','received','failed'].map(f => `<button class="chip ${filter===f?'active':''}" data-filter="${f}">${f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('')}
        </div>
        ${Object.keys(grouped).length ? Object.entries(grouped).map(([date, items]) => `
          <div class="history-date">${date}</div>
          <div class="card" style="margin-bottom:var(--space-md)">
            ${items.map(t => `
              <div class="txn-item">
                <div class="avatar avatar-sm" style="background:${t.type==='received'?'var(--success)':t.status==='failed'?'var(--error)':'var(--primary)'}">
                  ${t.type==='received'?'↓':t.status==='failed'?'!':'↑'}
                </div>
                <div class="txn-info">
                  <div class="txn-name">${t.name}</div>
                  <div class="txn-detail">${timeAgo(t.date)} • ${t.category}</div>
                </div>
                <div class="txn-amount">
                  <div class="amount ${t.type==='received'?'credit':'debit'}">${t.type==='received'?'+':'−'} ${formatCurrency(t.amount)}</div>
                  <div class="status" style="color:${t.status==='success'?'var(--success)':'var(--error)'}">${t.status}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('') : `
          <div class="history-empty">
            <svg viewBox="0 0 24 24"><path d="M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
            <p style="font-size:var(--font-md);font-weight:600">No transactions found</p>
            <p style="font-size:var(--font-sm);margin-top:4px">Try a different filter</p>
          </div>
        `}
      </div>`;

    container.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => { filter = btn.dataset.filter; render(); });
    });
  }

  render();
}
