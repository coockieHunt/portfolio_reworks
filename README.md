# 🌟 Portfolio Repository

**[🇫🇷 Version Française](./README_FR.md)**

Modern portfolio built with React 18, Vite and TypeScript. Self-hosted infrastructure with automated CI/CD and privacy-first approach.

[![Website](https://img.shields.io/website?label=jonathangleyze.fr&style=for-the-badge&url=https%3A%2F%2Fwww.jonathangleyze.fr)](https://www.jonathangleyze.fr)
[![License](https://img.shields.io/badge/License-Mixed-blue?style=for-the-badge)](./LICENSE.md)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

---

## 🌐 Live Demo

Check out the portfolio in production: **[jonathangleyze.fr](https://www.jonathangleyze.fr)**

---

## ✨ Features

- ⚡ **Performance**: React 18 + Vite for ultra-fast loading times
- 🎨 **Smooth Animations**: Engaging transitions powered by Framer Motion
- 📱 **Responsive Design**: Adaptive across all devices and screen sizes
- 🔐 **Privacy First**: No third-party tracking, self-hosted analytics (Umami)
- 🎭 **Modular Components**: Clean architecture with reusable components
- 🔄 **Dynamic Content**: Backend API for guestbook and contact form
- 🚀 **Production Ready**: Complete CI/CD pipeline with automated deployments

---

## 🖥️ Production Infrastructure

**Complete self-hosted stack on VPS**

```
┌─────────────────────────────────────┐
│         Self-hosted VPS             │
├─────────────────────────────────────┤
│  Frontend (React) + Backend (Node)  │
│                ↓                    │
│            PM2 Manager              │
│  (24/7 Uptime + Auto-restart)       │
│─────────────────────────────────────┤
│  Redis (Cache) | Umami (Analytics)  │
│─────────────────────────────────────┤
│      Gatus (Monitoring)             │
└─────────────────────────────────────┘
```

**Active Services**:

- 🔄 **PM2**: Process manager (24/7 availability, automatic restarts)
- 📊 **Umami**: Privacy-friendly analytics (self-hosted, GDPR compliant)
- 📈 **Gatus**: Real-time monitoring with health checks
- 🐳 **Docker**: Service containerization
- ⚡ **Redis**: Cache for optimal performance

**CI/CD Workflow**:

```bash
git push → GitHub Actions → Build → SSH Deploy → PM2 Reload (0 downtime)
```

1. **Local**: `npm run deploy` (validation + manual confirmation)
2. **GitHub Actions**: Automatic build on push to `prod`
3. **VPS**: SSH deployment + PM2 reload without interruption

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

```bash
# 1. Clone the project
git clone https://github.com/coockieHunt/portfolio_reworks.git
cd portfolio_reworks

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# 4. Start development server
npm run dev
```

**Available commands**:

- `npm run dev` - Development server (http://localhost:5173)
- `npm run dev:network` - Local network access
- `npm run build` - Production build
- `npm run deploy` - Automated deployment

⚠️ **Important**: Read [LICENSE.md](./LICENSE.md) before deploying to production.

---

## 🔗 API Configuration

**`.env.example` file**:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3001/api

# Umami Analytics ID (optional)
VITE_ANALYTICS_ID=your-umami-website-id
```

**Available endpoints**:

- `/api/guestbook` - Guestbook
- `/api/contact` - Contact form
- `/api/counter` - Visit counter

API clients are located in `src/api/`

---

## 🛠️ Tech Stack

**Frontend**

- React 18 | TypeScript | Vite
- Styled Components | Framer Motion

**Backend & Infrastructure**

- Node.js | Express.js | Redis
- Docker | PM2 | Umami Analytics

**DevOps**

- GitHub Actions | SSH Deploy | Git

---

## 📂 Project Structure

```
src/
├── api/              # API clients (guestbook, mail, counter)
├── assets/           # Images and static files
├── components/       # Reusable UI components
├── containers/       # Page sections (Hero, About, Projects...)
├── context/          # React contexts
├── hooks/            # Custom hooks
├── styles/           # Global styles and theme
├── types/            # TypeScript types
├── utils/            # Utility functions
├── config.tsx        # Configuration and theme
└── index.tsx         # Entry point
```

---

## 🔒 Privacy & Analytics

**Your privacy is a priority!**

✅ **Umami Analytics**: Self-hosted, GDPR compliant, no cookies  
✅ **No reCAPTCHA**: Custom honeypot system  
✅ **No Third-Party Tracking**: No Google Analytics, Meta Pixel, etc.  
✅ **Anonymized Data**: Secure storage on own infrastructure  
✅ **Open Source**: Fully transparent

---

## 📜 License

**Mixed license model**:

- **Code**: Open source (see [LICENSE.md](./LICENSE.md))
- **Design & Assets**: Proprietary © 2025 Jonathan Gleyze

### ✅ Allowed

- Use the code to learn and build your own projects
- Modify and adapt the code for your needs
- Use as reference for your own portfolio

### ❌ Not Allowed

- Clone this repository and use it as-is
- Use the design, graphics or content without permission
- Use for commercial purposes without explicit authorization

📖 **Full license**: [LICENSE.md](./LICENSE.md)

---

## 📧 Contact

📧 **Email**: [pro.jonathan.gleyze@gmail.com](mailto:pro.jonathan.gleyze@gmail.com)  
💼 **LinkedIn**: [Jonathan Gleyze](https://www.linkedin.com/in/jonathan-gleyze-173ab7239/)  
🐙 **GitHub**: [@coockieHunt](https://github.com/coockieHunt)  
🎨 **DeviantArt**: [coockiehunt](https://www.deviantart.com/coockiehunt)

---

<div align="center">

Made with ❤️ by Jonathan Gleyze

[⬆ Back to top](#-portfolio-repository)

</div>
