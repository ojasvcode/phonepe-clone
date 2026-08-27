import { store } from '../utils/store.js';
import { router } from '../utils/router.js';
import { formatCurrency, getInitials } from '../utils/helpers.js';
import { renderHeader } from '../components/header.js';
import { setActiveNav } from '../components/navbar.js';
import { showToast } from '../components/toast.js';

let selectedContact = null;
let amount = '';
let step = 'contacts'; // contacts | amount | pin | success

export function renderSend(params = {}) {
  renderHeader('Send Money');
  setActiveNav('home');
  const container = document.getElementById('screen-container');

  if (params.contactId) {
    selectedContact = store.getContacts().find(c => c.id === params.contactId);
    step = 'amount';
  } else {
    step = 'contacts';
    selectedContact = null;
    amount = '';
  }

  renderStep(container);
}

function renderStep(container) {
  if (step === 'contacts') renderContacts(container);
  else if (step === 'amount') renderAmount(container);
  else if (step === 'pin') renderPin(container);
  else if (step === 'success') renderSuccess(container);
}

function renderContacts(container) {
  const contacts = store.getContacts();
  container.innerHTML = `
    <div class="send-screen animate-fade-in">
      <div class="input-group" style="margin-bottom:var(--space-lg)">
        <input class="input-field" id="contact-search" placeholder="Enter name, UPI ID, or number" autocomplete="off"/>
      </div>
      <div class="section-title" style="font-size:var(--font-sm)">Recent</div>
      <div id="contact-list">
        ${contacts.map(c => `
          <div class="txn-item" data-cid="${c.id}">
            <div class="avatar" style="background:${c.color}">${getInitials(c.name)}</div>
            <div class="txn-info">
              <div class="txn-name">${c.name}</div>
              <div class="txn-detail">${c.upiId}</div>
            </div>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--text-tertiary)"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </div>
        `).join('')}
      </div>
    </div>`;

  container.querySelectorAll('[data-cid]').forEach(el => {
    el.addEventListener('click', () => {
      selectedContact = contacts.find(c => c.id === Number(el.dataset.cid));
      step = 'amount';
      amount = '';
      renderStep(container);
    });
  });

  document.getElementById('contact-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    container.querySelectorAll('[data-cid]').forEach(el => {
      const c = contacts.find(c => c.id === Number(el.dataset.cid));
      el.style.display = (!q || c.name.toLowerCase().includes(q) || c.upiId.includes(q)) ? '' : 'none';
    });
  });
}

function renderAmount(container) {
  container.innerHTML = `
    <div class="send-screen animate-fade-in">
      <div class="send-contact-card">
        <div class="avatar" style="background:${selectedContact.color}">${getInitials(selectedContact.name)}</div>
        <div class="txn-info">
          <div class="txn-name">${selectedContact.name}</div>
          <div class="txn-detail">${selectedContact.upiId}</div>
        </div>
      </div>
      <div class="amount-display">
        <span class="currency">₹</span>
        <span class="amount-value ${amount?'':'empty'}" id="amount-val">${amount || '0'}</span>
      </div>
      <div class="amount-suggestions">
        ${[100,200,500,1000,2000].map(v => `<button class="amount-chip" data-amt="${v}">₹${v}</button>`).join('')}
      </div>
      <div style="margin-top:var(--space-2xl)">
        <div class="pin-pad" id="num-pad">
          ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `<button class="pin-key ${k===''?'empty':''} ${k==='⌫'?'delete':''}">${k}</button>`).join('')}
        </div>
      </div>
      <div style="padding:var(--space-base);margin-top:var(--space-md)">
        <button class="btn btn-primary btn-full btn-lg" id="proceed-btn" ${!amount?'disabled style="opacity:0.5"':''}>Proceed to Pay</button>
      </div>
    </div>`;

  container.querySelectorAll('.amount-chip').forEach(btn => {
    btn.addEventListener('click', () => { amount = btn.dataset.amt; renderAmount(container); });
  });

  container.querySelectorAll('#num-pad .pin-key:not(.empty)').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.textContent;
      if (val === '⌫') amount = amount.slice(0, -1);
      else if (amount.length < 7) amount += val;
      const display = document.getElementById('amount-val');
      if (display) { display.textContent = amount || '0'; display.classList.toggle('empty', !amount); }
      const proceed = document.getElementById('proceed-btn');
      if (proceed) { proceed.disabled = !amount || Number(amount) === 0; proceed.style.opacity = (!amount || Number(amount) === 0) ? '0.5' : '1'; }
    });
  });

  document.getElementById('proceed-btn')?.addEventListener('click', () => {
    if (amount && Number(amount) > 0) { step = 'pin'; renderStep(container); }
  });
}

function renderPin(container) {
  let pin = '';
  container.innerHTML = `
    <div class="send-screen animate-fade-in" style="text-align:center;padding-top:var(--space-3xl)">
      <div style="margin-bottom:var(--space-sm)">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--primary)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
      </div>
      <h3 style="font-size:var(--font-lg);font-weight:700">Enter UPI PIN</h3>
      <p style="font-size:var(--font-sm);color:var(--text-tertiary);margin-top:4px">To pay ${formatCurrency(Number(amount))} to ${selectedContact.name}</p>
      <div class="pin-dots" id="pin-dots">
        ${[0,1,2,3,4,5].map(() => '<div class="pin-dot"></div>').join('')}
      </div>
      <div class="pin-pad" id="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `<button class="pin-key ${k===''?'empty':''} ${k==='⌫'?'delete':''}">${k}</button>`).join('')}
      </div>
    </div>`;

  const dots = container.querySelectorAll('.pin-dot');
  container.querySelectorAll('#pin-pad .pin-key:not(.empty)').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.textContent;
      if (val === '⌫') { pin = pin.slice(0, -1); }
      else if (pin.length < 6) { pin += val; }
      dots.forEach((d, i) => d.classList.toggle('filled', i < pin.length));
      if (pin.length === 6) {
        setTimeout(() => processPayment(container), 500);
      }
    });
  });
}

function processPayment(container) {
  const success = Math.random() > 0.1;
  const txn = store.addTransaction({
    type: 'sent', name: selectedContact.name, amount: Number(amount),
    status: success ? 'success' : 'failed', category: 'transfer', upiId: selectedContact.upiId,
  });
  step = 'success';
  renderPaymentResult(container, txn, success);
}

function renderPaymentResult(container, txn, success) {
  document.getElementById('app-header').innerHTML = '';
  document.getElementById('bottom-nav').innerHTML = '';
  container.innerHTML = `
    <div class="success-overlay">
      <div class="success-circle" style="${success?'':'background:var(--error)'}">
        ${success
          ? '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
          : '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'}
      </div>
      <div class="success-amount">${success?'':'Payment Failed'}</div>
      ${success ? `<div class="success-amount">${formatCurrency(Number(amount))}</div>` : ''}
      <div class="success-msg">${success ? `Paid to ${selectedContact.name}` : 'Transaction could not be completed'}</div>
      <div class="success-details">
        <div class="success-detail-row"><span class="label">To</span><span class="value">${selectedContact.name}</span></div>
        <div class="success-detail-row"><span class="label">UPI ID</span><span class="value">${selectedContact.upiId}</span></div>
        <div class="success-detail-row"><span class="label">Amount</span><span class="value">${formatCurrency(Number(amount))}</span></div>
        <div class="success-detail-row"><span class="label">Status</span><span class="value" style="color:${success?'var(--success)':'var(--error)'}">${success?'Success':'Failed'}</span></div>
        <div class="success-detail-row"><span class="label">Txn ID</span><span class="value">${txn.id}</span></div>
      </div>
      <div class="success-actions">
        <button class="btn btn-secondary" style="flex:1" id="success-home">Home</button>
        ${success ? `<button class="btn btn-primary" style="flex:1" id="success-share">Share</button>` : `<button class="btn btn-primary" style="flex:1" id="success-retry">Retry</button>`}
      </div>
    </div>`;

  document.getElementById('success-home')?.addEventListener('click', () => router.navigate('home'));
  document.getElementById('success-retry')?.addEventListener('click', () => { step = 'pin'; renderPin(container); });
  document.getElementById('success-share')?.addEventListener('click', () => showToast('Payment receipt copied!', 'success'));
}
