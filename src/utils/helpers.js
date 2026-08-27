export function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
}

export function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return Math.floor(diff/60) + 'm ago';
  if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
  if (diff < 604800) return Math.floor(diff/86400) + 'd ago';
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

export function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
}

export function groupByDate(transactions) {
  const groups = {};
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  transactions.forEach(t => {
    const ds = new Date(t.date).toDateString();
    let label = ds === today ? 'Today' : ds === yesterday ? 'Yesterday' : formatDate(t.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(t);
  });
  return groups;
}

export function getCategoryIcon(category) {
  const icons = { transfer:'💸', recharge:'📱', bill:'📄', investment:'📈', insurance:'🛡️' };
  return icons[category] || '💰';
}

export function getStatusColor(status) {
  return status === 'success' ? 'var(--success)' : status === 'failed' ? 'var(--error)' : 'var(--warning)';
}

export function generateTxnId() { return 'TXN' + Date.now() + Math.random().toString(36).slice(2,6).toUpperCase(); }
