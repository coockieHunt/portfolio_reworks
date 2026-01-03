# 🌟 Portfolio Repository [FR]

**[🇬🇧 English Version](./README.md)**

Portfolio moderne développé avec React 18, Vite et TypeScript. Infrastructure auto-hébergée avec CI/CD automatisé et respect de la vie privée.

[![Website](https://img.shields.io/website?label=jonathangleyze.fr&style=for-the-badge&url=https%3A%2F%2Fwww.jonathangleyze.fr)](https://www.jonathangleyze.fr)
[![License](https://img.shields.io/badge/License-Mixte-blue?style=for-the-badge)](./LICENSE.md)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

---

## 🌐 Démo en Ligne

Consultez le portfolio en production : **[jonathangleyze.fr](https://www.jonathangleyze.fr)**

---

## ✨ Fonctionnalités

- ⚡ **Performance** : React 18 + Vite pour des temps de chargement ultra-rapides
- 🎨 **Animations Fluides** : Transitions engageantes propulsées par Framer Motion
- 📱 **Design Responsive** : Adaptatif sur tous les appareils et tailles d'écran
- 🔐 **Privacy First** : Aucun tracking tiers, analytics auto-hébergées (Umami)
- 🎭 **Composants Modulaires** : Architecture clean avec composants réutilisables
- 🔄 **Contenu Dynamique** : API backend pour guestbook et formulaire de contact
- 🚀 **Production Ready** : Pipeline CI/CD complet avec déploiements automatisés

---

## 🖥️ Infrastructure Production

**Stack complète auto-hébergée sur VPS**

```
┌─────────────────────────────────────┐
│         VPS Auto-hébergé            │
├─────────────────────────────────────┤
│  Frontend (React) + Backend (Node)  │
│                ↓                    │
│            PM2 Manager              │
│  (Uptime 24/7 + Auto-restart)       │
│─────────────────────────────────────┤
│  Redis (Cache) | Umami (Analytics)  │
│─────────────────────────────────────┤
│      Uptime Kuma (Monitoring)       │
└─────────────────────────────────────┘
```

**Services actifs** :

- 🔄 **PM2** : Gestionnaire de processus (disponibilité 24/7, redémarrages automatiques)
- 📊 **Umami** : Analytics respectueuses de la vie privée (auto-hébergé, conforme RGPD)
- 📈 **Uptime Kuma** : Monitoring en temps réel avec vérifications de santé
- 🐳 **Docker** : Containerisation des services
- ⚡ **Redis** : Cache pour performances optimales

**Workflow CI/CD** :

```bash
git push → GitHub Actions → Build → SSH Deploy → PM2 Reload (0 downtime)
```

1. **Local** : `npm run deploy` (validation + confirmation manuelle)
2. **GitHub Actions** : Build automatique sur push vers `prod`
3. **VPS** : Déploiement SSH + rechargement PM2 sans interruption

---

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/coockieHunt/portfolio_reworks.git
cd portfolio_reworks

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos paramètres

# 4. Lancer en développement
npm run dev
```

**Commandes disponibles** :

- `npm run dev` - Serveur de développement (http://localhost:5173)
- `npm run dev:network` - Accès réseau local
- `npm run build` - Build production
- `npm run deploy` - Déploiement automatique

⚠️ **Important** : Lisez [LICENSE.md](./LICENSE.md) avant de déployer en production.

---

## 🔗 Configuration API

**Fichier `.env.example`** :

```env
# URL de l'API backend
VITE_API_BASE_URL=http://localhost:3001/api

# ID Analytics Umami (optionnel)
VITE_ANALYTICS_ID=your-umami-website-id
```

**Endpoints disponibles** :

- `/api/guestbook` - Livre d'or
- `/api/contact` - Formulaire de contact
- `/api/counter` - Compteur de visites

Les clients API sont dans `src/api/`

---

## 🛠️ Stack Technique

**Frontend**

- React 18 | TypeScript | Vite
- Styled Components | Framer Motion

**Backend & Infrastructure**

- Node.js | Express.js | Redis
- Docker | PM2 | Umami Analytics

**DevOps**

- GitHub Actions | SSH Deploy | Git

---

## 📂 Structure du Projet

```
src/
├── api/              # Clients API (guestbook, mail, counter)
├── assets/           # Images et fichiers statiques
├── components/       # Composants UI réutilisables
├── containers/       # Sections de page (Hero, About, Projects...)
├── context/          # Contextes React
├── hooks/            # Hooks personnalisés
├── styles/           # Styles globaux et thème
├── types/            # Types TypeScript
├── utils/            # Fonctions utilitaires
├── config.tsx        # Configuration et thème
└── index.tsx         # Point d'entrée
```

---

## 🔒 Confidentialité & Analytiques

**Votre vie privée est une priorité !**

✅ **Umami Analytics** : Auto-hébergé, conforme RGPD, sans cookies  
✅ **Pas de reCAPTCHA** : Système honeypot personnalisé  
✅ **Aucun Tracking Tiers** : Pas de Google Analytics, Meta Pixel, etc.  
✅ **Données Anonymisées** : Stockage sécurisé sur infrastructure propre  
✅ **Open Source** : Totalement transparent

---

## 📜 Licence

**Modèle de licence mixte** :

- **Code** : Open source (voir [LICENSE.md](./LICENSE.md))
- **Design & Assets** : Propriétaire © 2025 Jonathan Gleyze

### ✅ Autorisé

- Utiliser le code pour apprendre et construire vos projets
- Modifier et adapter le code pour vos besoins
- Utiliser comme référence pour votre portfolio

### ❌ Interdit

- Cloner ce dépôt et l'utiliser tel quel
- Utiliser le design, graphiques ou contenu sans permission
- Utiliser à des fins commerciales sans autorisation explicite

📖 **Licence complète** : [LICENSE.md](./LICENSE.md)

---

## 📧 Contact

📧 **Email** : [pro.jonathan.gleyze@gmail.com](mailto:pro.jonathan.gleyze@gmail.com)  
💼 **LinkedIn** : [Jonathan Gleyze](https://www.linkedin.com/in/jonathan-gleyze-173ab7239/)  
🐙 **GitHub** : [@coockieHunt](https://github.com/coockieHunt)  
🎨 **DeviantArt** : [coockiehunt](https://www.deviantart.com/coockiehunt)

---

<div align="center">

Fait avec ❤️ par Jonathan Gleyze

[⬆ Retour en haut](#-portfolio-repository-fr)

</div>
