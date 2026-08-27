export function renderCarousel(slides, containerId) {
  let current = 0;
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="carousel-container">
      <div class="carousel-track" id="${containerId}-track">
        ${slides.map((s, i) => `<div class="carousel-slide" style="background:${s.bg}">${s.html}</div>`).join('')}
      </div>
    </div>
    <div class="carousel-dots" id="${containerId}-dots">
      ${slides.map((_, i) => `<div class="carousel-dot ${i===0?'active':''}" data-i="${i}"></div>`).join('')}
    </div>`;

  const track = document.getElementById(`${containerId}-track`);
  const dots = container.querySelectorAll('.carousel-dot');

  function goTo(i) {
    current = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  dots.forEach(d => d.addEventListener('click', () => goTo(Number(d.dataset.i))));
  setInterval(() => goTo((current + 1) % slides.length), 4000);
}
