import { renderHeader } from '../components/header.js';
import { setActiveNav } from '../components/navbar.js';
import { showToast } from '../components/toast.js';
import { router } from '../utils/router.js';

export function renderScan() {
  renderHeader('Scan & Pay');
  setActiveNav('scan');
  const container = document.getElementById('screen-container');
  container.innerHTML = `
    <div class="scan-screen animate-fade-in">
      <div class="scan-viewfinder">
        <div class="scan-corner tl"></div>
        <div class="scan-corner tr"></div>
        <div class="scan-corner bl"></div>
        <div class="scan-corner br"></div>
        <div class="scan-line"></div>
        <div style="position:absolute;inset:30px;background:rgba(139,92,207,0.05);border-radius:8px"></div>
      </div>
      <div class="scan-label">Point your camera at a QR code</div>
      <div class="scan-manual">
        <div class="scan-or">OR</div>
        <div class="input-group" style="width:100%">
          <input class="input-field" id="upi-id-input" placeholder="Enter UPI ID (e.g. name@upi)" style="background:rgba(255,255,255,0.1);color:white;text-align:center"/>
        </div>
        <button class="btn btn-primary btn-full" id="scan-pay-btn" style="max-width:280px">Pay via UPI ID</button>
      </div>
      <div style="display:flex;gap:var(--space-2xl);margin-top:var(--space-3xl)">
        <div style="text-align:center;cursor:pointer" id="scan-gallery">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 6px">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
          </div>
          <span style="font-size:11px;color:rgba(255,255,255,0.7)">Gallery</span>
        </div>
        <div style="text-align:center;cursor:pointer" id="scan-flash">
          <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 6px">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
          </div>
          <span style="font-size:11px;color:rgba(255,255,255,0.7)">Flash</span>
        </div>
      </div>
    </div>`;

  document.getElementById('scan-pay-btn')?.addEventListener('click', () => {
    const upi = document.getElementById('upi-id-input')?.value;
    if (upi && upi.includes('@')) {
      router.navigate('send', { contactId: 1 });
    } else {
      showToast('Enter a valid UPI ID', 'error');
    }
  });
  document.getElementById('scan-gallery')?.addEventListener('click', () => showToast('Gallery scanner coming soon', 'info'));
  document.getElementById('scan-flash')?.addEventListener('click', () => showToast('Flash toggled', 'info'));
}
