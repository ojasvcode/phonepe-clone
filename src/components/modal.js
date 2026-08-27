export function showModal(content, onClose) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `<div class="modal-overlay" id="modal-overlay">
    <div class="modal-sheet"><div class="modal-handle"></div>${content}</div>
  </div>`;
  root.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') { closeModal(); if (onClose) onClose(); }
  });
}
export function closeModal() { document.getElementById('modal-root').innerHTML = ''; }
