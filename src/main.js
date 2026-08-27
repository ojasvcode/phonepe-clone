import { router } from './utils/router.js';
import { renderSplash } from './screens/splash.js';
import { renderHome } from './screens/home.js';
import { renderSend } from './screens/send.js';
import { renderScan } from './screens/scan.js';
import { renderHistory } from './screens/history.js';
import { renderProfile } from './screens/profile.js';
import { renderRewards } from './screens/rewards.js';
import { renderNavbar, setActiveNav } from './components/navbar.js';
import './components/toast.js';

// Register routes
router.register('home', () => { renderNavbar(); renderHome(); });
router.register('send', (params) => { renderNavbar(); renderSend(params); });
router.register('scan', () => { renderNavbar(); renderScan(); });
router.register('history', () => { renderNavbar(); renderHistory(); });
router.register('profile', () => { renderNavbar(); renderProfile(); });
router.register('rewards', () => { renderNavbar(); renderRewards(); });

// Boot
renderSplash(() => {
  document.getElementById('app-container').classList.remove('hidden');
  router.navigate('home');
});
