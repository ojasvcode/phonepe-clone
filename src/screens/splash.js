export function renderSplash(onDone) {
  const el = document.getElementById('splash-screen');
  el.innerHTML = `<div class="splash">
    <div class="splash-logo">
      <svg viewBox="0 0 60 60" fill="none">
        <rect width="60" height="60" rx="12" fill="#5f259f"/>
        <path d="M20 15h8c6 0 10 3 10 8s-4 8-10 8h-4l-2 14h-6l4-30zm6 12h3c3 0 5-1.5 5-4s-2-4-5-4h-3l-2 8h2z" fill="white"/>
      </svg>
    </div>
    <div class="splash-title">PhonePe</div>
    <div class="splash-subtitle">Payments Made Simple</div>
  </div>`;

  setTimeout(() => {
    el.querySelector('.splash').classList.add('fade-out');
    setTimeout(() => { el.innerHTML = ''; onDone(); }, 400);
  }, 2000);
}
