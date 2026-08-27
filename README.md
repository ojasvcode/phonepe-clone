# 💜 PhonePe Clone

A mobile-first **PhonePe UPI payment app clone** built with **Vanilla JavaScript (ES Modules)** — featuring a splash screen, SPA routing, UPI money transfer flow, QR scanner, transaction history, rewards, and a profile page.

---

## ✨ Features

- 💫 **Animated Splash Screen** — Logo animation on app boot
- 🏠 **Home Screen** — Quick actions (Send, Receive, Scan, Pay Bills), recent transactions, balance card
- 💸 **Send Money** — Contact search, UPI ID entry, amount input, PIN confirmation flow
- 📷 **QR Scanner** — Camera-based QR code scanner UI with scan overlay
- 📋 **Transaction History** — Filterable list of past transactions (All, Credit, Debit)
- 🎁 **Rewards Screen** — Cashback offers and reward points
- 👤 **Profile Page** — User info, linked bank accounts, settings
- 🔔 **Toast Notifications** — Non-blocking feedback messages
- 🧭 **SPA Router** — Client-side routing without page reloads
- 📱 **Mobile-first Design** — Full-screen app layout optimized for phone screens

---

## 🗂️ Project Structure

```
phonepe-clone/
├── index.html                  # App shell
├── src/
│   ├── main.js                 # App entry — route registration & boot
│   ├── screens/
│   │   ├── splash.js           # Animated splash screen
│   │   ├── home.js             # Home dashboard
│   │   ├── send.js             # Send money flow
│   │   ├── scan.js             # QR scanner screen
│   │   ├── history.js          # Transaction history
│   │   ├── rewards.js          # Rewards & cashback
│   │   └── profile.js          # User profile & settings
│   ├── components/
│   │   ├── navbar.js           # Bottom navigation bar
│   │   ├── header.js           # Top header bar
│   │   ├── modal.js            # Reusable modal component
│   │   ├── carousel.js         # Offer carousel
│   │   └── toast.js            # Toast notification system
│   ├── utils/
│   │   ├── router.js           # Lightweight SPA router
│   │   ├── store.js            # App state management
│   │   └── helpers.js          # Utility functions (formatting, etc.)
│   └── styles/
│       ├── index.css           # Global styles & CSS variables
│       ├── screens.css         # Screen-specific styles
│       ├── components.css      # Component styles
│       └── animations.css      # Transitions & animations
└── package.json
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Vanilla JavaScript (ES Modules) | All app logic |
| CSS3 | Mobile-first layout, animations, theming |
| Vite | Dev server & bundler |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16+

### Installation & Run

```bash
git clone https://github.com/ojasvcode/phonepe-clone.git
cd phonepe-clone
npm install
npm run dev
```

Open **http://localhost:5173** in your browser (best viewed at mobile viewport).

---

## 📱 App Screens

| Screen | Route | Description |
|---|---|---|
| Splash | — | Boot animation |
| Home | `home` | Dashboard with quick actions |
| Send Money | `send` | UPI transfer flow |
| QR Scan | `scan` | Camera scanner |
| History | `history` | Transaction list |
| Rewards | `rewards` | Cashback & points |
| Profile | `profile` | User settings |

---

## 📄 License

This project is for educational purposes only and is not affiliated with PhonePe Private Limited.

---

<div align="center">Made with ❤️ by <a href="https://github.com/ojasvcode">ojasvcode</a></div>
