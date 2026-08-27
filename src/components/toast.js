let toastTimeout;
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-root');
  if (!container) return;
  container.innerHTML = `<div class="toast-container"><div class="toast ${type}">
    <span>${type==='success'?'✓':type==='error'?'✗':'ℹ'}</span> ${message}
  </div></div>`;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    const t = container.querySelector('.toast');
    if (t) { t.classList.add('exiting'); setTimeout(() => container.innerHTML = '', 300); }
  }, 2500);
}

// Listen for toast events
window.addEventListener('toast', (e) => showToast(e.detail.message, e.detail.type));
