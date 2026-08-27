import { store } from '../utils/store.js';
import { formatCurrency } from '../utils/helpers.js';
import { renderHeader } from '../components/header.js';
import { setActiveNav } from '../components/navbar.js';
import { showToast } from '../components/toast.js';

export function renderRewards() {
  renderHeader('Rewards');
  setActiveNav('rewards');
  const container = document.getElementById('screen-container');
  const rewards = store.getRewards();

  container.innerHTML = `
    <div class="rewards-screen animate-fade-in">
      <div class="reward-banner">
        <h2>₹${rewards.totalCashback} earned!</h2>
        <p>Total cashback from your transactions</p>
      </div>

      <div class="section-title">Scratch Cards</div>
      ${rewards.scratchCards.map(card => `
        <div class="scratch-card ${card.revealed?'revealed':''}" data-scratch-id="${card.id}">
          <div class="scratch-content">
            <span class="label">${card.label}</span>
            <span>🎉 ${formatCurrency(card.amount)}</span>
          </div>
          <div class="scratch-overlay">
            <span class="scratch-icon">🎁</span>
            <span>Tap to Scratch</span>
          </div>
        </div>
      `).join('')}

      <div class="section-title" style="margin-top:var(--space-lg)">Offers For You</div>
      ${rewards.offers.map(o => `
        <div class="offer-card">
          <div class="offer-icon" style="background:${o.color}">${o.icon}</div>
          <div class="offer-info">
            <div class="offer-title">${o.title}</div>
            <div class="offer-desc">${o.desc}</div>
          </div>
          ${o.badge ? `<span class="offer-badge" style="background:${o.badgeColor}20;color:${o.badgeColor}">${o.badge}</span>` : ''}
        </div>
      `).join('')}
    </div>`;

  container.querySelectorAll('.scratch-card:not(.revealed)').forEach(el => {
    el.addEventListener('click', () => {
      const id = Number(el.dataset.scratchId);
      const card = store.revealScratchCard(id);
      el.classList.add('revealed');
      if (card) showToast(`🎉 You won ${formatCurrency(card.amount)} cashback!`, 'success');
      // Update banner
      const banner = container.querySelector('.reward-banner h2');
      if (banner) banner.textContent = `₹${store.getRewards().totalCashback} earned!`;
    });
  });
}
