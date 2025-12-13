# 🌟 Portfolio Repository [ENG]

Welcome to my portfolio repository! This repository contains the source code for my public portfolio, which showcases my skills and projects. Feel free to explore the code and projects to get a better understanding of my work.

<!-- STATUS & LINKS -->
[![Website](https://img.shields.io/website?label=jonathangleyze.fr&style=for-the-badge&url=https%3A%2F%2Fwww.jonathangleyze.fr)](https://www.jonathangleyze.fr)
[![Deployment](https://img.shields.io/badge/Deploy-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/coockieHunt/portfolio_reworks/actions)
[![Uptime](https://img.shields.io/badge/Uptime-Monitored%20by%20Kuma-00B27A?style=for-the-badge&logo=uptime-kuma&logoColor=white)](https://www.jonathangleyze.fr)
[![License](https://img.shields.io/badge/License-Mixed-blue?style=for-the-badge)](./LICENSE.md)

<!-- TECH STACK FRONT -->
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

<!-- TECH STACK BACK & OPS -->
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-portfolio)
- [Installation](#-installation)
- [API Configuration](#-api-configuration)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Infrastructure](#️-hosting--infrastructure)
- [CI/CD Workflow](#-cicd-workflow)
- [Privacy & Analytics](#-privacy--analytics)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

- **Modern React Architecture**: Built with React 18 and Vite for lightning-fast performance
- **Smooth Animations**: Powered by Framer Motion for fluid, engaging user experiences
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Dynamic Content**: Centralized data management for easy content updates
- **Interactive Components**: Custom-built components including animated SVGs, scroll effects, and more
- **Optimized Performance**: Code splitting and lazy loading for optimal load times
- **Privacy-First**: Self-hosted analytics with no third-party tracking
- **Production-Ready**: Complete CI/CD pipeline with automated deployments

---

## 🌐 Live Portfolio

View my portfolio online at **[jonathangleyze.fr](https://www.jonathangleyze.fr)**

---

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/coockieHunt/portfolio_reworks.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd portfolio_reworks
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure environment variables** (see [API Configuration](#-api-configuration))

5. **Start the development server**:
   ```bash
   npm run dev
   ```

   For network access (accessible from other devices):
   ```bash
   npm run dev:network
   ```

6. **Build for production**:
   ```bash
   npm run build
   ```
   
   ⚠️ **Important**: Read the [LICENSE.md](./LICENSE.md) before deploying or using this code in production.

The development server will be available at `http://localhost:5173` 🎉

---

## 🔧 API Configuration

Configure the API endpoint by setting the `VITE_API_BASE_URL` environment variable:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and set your API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

**Default value**: If not set, defaults to `http://localhost:3001/api`

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript (tsx)
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Icons**: React Icons

### Backend & Infrastructure
- **Runtime**: Node.js
- **Framework**: Express.js
- **Cache**: Redis
- **Containerization**: Docker
- **Process Manager**: PM2
- **Monitoring**: Uptime Kuma
- **Analytics**: Umami (self-hosted)

### DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: Automated via SSH
- **Version Control**: Git

---

## 📂 Project Structure

```
src/
├── api/           # API clients (guestbook, mail, counter)
├── assets/        # Images, PDFs, and static files
├── components/    # Reusable UI components
├── containers/    # Page sections & layouts
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── styles/        # Global styles & theme helpers
├── types/         # Shared TypeScript types
├── utils/         # Helper functions & utilities
├── data.tsx       # Centralized content data
├── config.tsx     # App configuration and theming
└── index.tsx      # App entry point
```

---

## 🖥️ Hosting & Infrastructure

> **Note**: This setup describes my live production environment. You do **not** need these tools to run the project locally.

### Production Stack

- **PM2**: Process manager ensuring 24/7 uptime and automatic restarts
- **Uptime Kuma**: Real-time monitoring and health checks
- **Umami Analytics**: Self-hosted instance for privacy-first tracking
- **Automated Deployments**: CI/CD pipeline for seamless updates

This setup ensures maximum reliability, performance, and data sovereignty.

---

## 🔄 CI/CD Workflow

### Automated Deployment Pipeline

#### 1. Local Automation (`npm run deploy`)
- Custom **Bash script** manages the Git workflow
- Secures the `main` branch
- Validates changes
- Requests **manual confirmation** before merging to `prod`

#### 2. Remote Deployment (GitHub Actions)
- Triggered automatically on push to `prod` branch
- Secure SSH connection to VPS
- Pulls latest code
- Runs `npm run build`
- Performs **zero-downtime reload** via PM2

### Workflow Steps
```
Local Changes → main branch → Manual approval → prod branch → GitHub Actions → VPS Deployment
```

---

## 🔒 Privacy & Analytics

Your privacy is a priority! This portfolio implements:

### Features
- ✅ **Umami Analytics**: Privacy-focused, GDPR-compliant analytics
- ✅ **No reCAPTCHA**: Custom honeypot system for contact form
- ✅ **No Third-Party Tracking**: No cookies, no fingerprinting, no data selling
- ✅ **Open Source**: Self-hosted and fully transparent
- ✅ **Anonymized Data**: All analytics data is anonymized

All data is stored securely on my own infrastructure.

---

## 📜 License

This project uses a **mixed license model**:

- **Code**: Open source (see [LICENSE.md](./LICENSE.md))
- **Design & Assets**: Proprietary - © 2025 Jonathan Gleyze

### What you CAN do:
✅ Use the code to learn and build your own projects  
✅ Modify and adapt the code for your needs  
✅ Use as a reference for your own portfolio

### What you CANNOT do:
❌ Clone this repository and use it as-is for your portfolio  
❌ Use the design, graphics, or content without permission  
❌ Use for commercial purposes without explicit authorization

**📖 Read the full license**: [LICENSE.md](./LICENSE.md)

---

## 📧 Contact

Feel free to reach out if you have any questions:

- 📧 **Email**: [pro.jonathan.gleyze@gmail.com](mailto:pro.jonathan.gleyze@gmail.com)
- 💼 **LinkedIn**: [Jonathan Gleyze](https://www.linkedin.com/in/jonathan-gleyze-173ab7239/)
- 🐙 **GitHub**: [@coockieHunt](https://github.com/coockieHunt)
- 🎨 **DeviantArt**: [coockiehunt](https://www.deviantart.com/coockiehunt)

---

<div align="center">

Made with ❤️ by Jonathan Gleyze

[⬆ Back to top](#-portfolio-repository-eng)

</div>

---
---
---

# 🌟 Portfolio Repository [FR]

Bienvenue dans mon référentiel de portfolio ! Ce référentiel contient le code source de mon portfolio public, qui met en valeur mes compétences et mes projets. N'hésitez pas à explorer le code et les projets pour mieux comprendre mon travail.

<!-- STATUS & LINKS -->
[![Website](https://img.shields.io/website?label=jonathangleyze.fr&style=for-the-badge&url=https%3A%2F%2Fwww.jonathangleyze.fr)](https://www.jonathangleyze.fr)
[![Deployment](https://img.shields.io/badge/Deploy-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/coockieHunt/portfolio_reworks/actions)
[![Uptime](https://img.shields.io/badge/Uptime-Monitored%20by%20Kuma-00B27A?style=for-the-badge&logo=uptime-kuma&logoColor=white)](https://www.jonathangleyze.fr)
[![License](https://img.shields.io/badge/License-Mixte-blue?style=for-the-badge)](./LICENSE.md)

<!-- TECH STACK FRONT -->
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

<!-- TECH STACK BACK & OPS -->
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

## 📋 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Démo en Ligne](#-portfolio-en-ligne)
- [Installation](#-installation)
- [Configuration API](#-configuration-api)
- [Stack Technique](#️-stack-technique)
- [Structure du Projet](#-structure-du-projet)
- [Infrastructure](#️-hébergement--infrastructure)
- [Workflow CI/CD](#-workflow-cicd)
- [Confidentialité & Analytiques](#-confidentialité--analytiques)
- [Licence](#-licence)
- [Contact](#-contact)

---

## ✨ Fonctionnalités

- **Architecture React Moderne**: Construit avec React 18 et Vite pour des performances ultra-rapides
- **Animations Fluides**: Propulsé par Framer Motion pour des expériences utilisateur engageantes
- **Design Responsive**: Entièrement responsive sur tous les appareils et tailles d'écran
- **Contenu Dynamique**: Gestion centralisée des données pour des mises à jour faciles
- **Composants Interactifs**: Composants personnalisés incluant des SVG animés, effets de scroll, et plus
- **Performance Optimisée**: Code splitting et lazy loading pour des temps de chargement optimaux
- **Respect de la Vie Privée**: Analytiques auto-hébergées sans tracking tiers
- **Production Ready**: Pipeline CI/CD complet avec déploiements automatisés

---

## 🌐 Portfolio en Ligne

Consultez mon portfolio en ligne sur **[jonathangleyze.fr](https://www.jonathangleyze.fr)**

---

## 🚀 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes d'Installation

1. **Cloner le référentiel**:
   ```bash
   git clone https://github.com/coockieHunt/portfolio_reworks.git
   ```

2. **Accéder au répertoire du projet**:
   ```bash
   cd portfolio_reworks
   ```

3. **Installer les dépendances**:
   ```bash
   npm install
   ```

4. **Configurer les variables d'environnement** (voir [Configuration API](#-configuration-api))

5. **Démarrer le serveur de développement**:
   ```bash
   npm run dev
   ```

   Pour l'accès réseau (accessible depuis d'autres appareils):
   ```bash
   npm run dev:network
   ```

6. **Compiler pour la production**:
   ```bash
   npm run build
   ```
   
   ⚠️ **Important**: Lisez le [LICENSE.md](./LICENSE.md) avant de déployer ou d'utiliser ce code en production.

Le serveur de développement sera disponible sur `http://localhost:5173` 🎉

---

## 🔧 Configuration API

Configurez l'URL de l'API en définissant la variable d'environnement `VITE_API_BASE_URL`:

1. Copiez le fichier d'exemple:
   ```bash
   cp .env.example .env.local
   ```

2. Éditez `.env.local` et définissez votre URL API:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

**Valeur par défaut**: Si non définie, l'URL sera `http://localhost:3001/api`

---

## 🛠️ Stack Technique

### Frontend
- **Framework**: React 18
- **Outil de Build**: Vite
- **Langage**: TypeScript (tsx)
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Icônes**: React Icons

### Backend & Infrastructure
- **Runtime**: Node.js
- **Framework**: Express.js
- **Cache**: Redis
- **Containerisation**: Docker
- **Gestionnaire de Processus**: PM2
- **Surveillance**: Uptime Kuma
- **Analytiques**: Umami (auto-hébergé)

### DevOps
- **CI/CD**: GitHub Actions
- **Déploiement**: Automatisé via SSH
- **Contrôle de Version**: Git

---

## 📂 Structure du Projet

```
src/
├── api/           # Clients API (guestbook, mail, counter)
├── assets/        # Images, PDFs et fichiers statiques
├── components/    # Composants UI réutilisables
├── containers/    # Sections de page & layouts
├── context/       # Providers de contexte React
├── hooks/         # Hooks React personnalisés
├── styles/        # Styles globaux et helpers de thème
├── types/         # Types TypeScript partagés
├── utils/         # Fonctions utilitaires
├── data.tsx       # Données de contenu centralisées
├── config.tsx     # Configuration et thème de l'application
└── index.tsx      # Point d'entrée de l'application
```

---

## 🖥️ Hébergement & Infrastructure

> **Note**: Cette configuration concerne mon environnement de production en direct. Vous n'avez **pas** besoin de ces outils pour lancer le projet localement.

### Stack de Production

- **PM2**: Gestionnaire de processus assurant une disponibilité 24/7 et des redémarrages automatiques
- **Uptime Kuma**: Surveillance en temps réel et vérifications de santé
- **Umami Analytics**: Instance auto-hébergée pour un suivi respectueux de la vie privée
- **Déploiements Automatisés**: Pipeline CI/CD pour des mises à jour fluides

Cette configuration garantit une fiabilité, performance et souveraineté des données maximales.

---

## 🔄 Workflow CI/CD

### Pipeline de Déploiement Automatisé

#### 1. Automatisation Locale (`npm run deploy`)
- **Script Bash** personnalisé gérant le workflow Git
- Sécurise la branche `main`
- Valide les changements
- Demande une **confirmation manuelle** avant fusion vers `prod`

#### 2. Déploiement Distant (GitHub Actions)
- Déclenché automatiquement lors d'un push sur `prod`
- Connexion SSH sécurisée au VPS
- Récupération du dernier code
- Exécution de `npm run build`
- **Rechargement sans temps d'arrêt** via PM2

### Étapes du Workflow
```
Changements Locaux → branche main → Approbation manuelle → branche prod → GitHub Actions → Déploiement VPS
```

---

## 🔒 Confidentialité & Analytiques

Votre vie privée est une priorité ! Ce portfolio implémente:

### Fonctionnalités
- ✅ **Umami Analytics**: Analytiques respectueuses de la vie privée, conformes RGPD
- ✅ **Pas de reCAPTCHA**: Système honeypot personnalisé pour le formulaire de contact
- ✅ **Aucun Tracking Tiers**: Pas de cookies, pas d'empreinte digitale, pas de revente de données
- ✅ **Open Source**: Auto-hébergé et totalement transparent
- ✅ **Données Anonymisées**: Toutes les données analytiques sont anonymisées

Toutes les données sont stockées en sécurité sur ma propre infrastructure.

---

## 📜 Licence

Ce projet utilise un **modèle de licence mixte**:

- **Code**: Open source (voir [LICENSE.md](./LICENSE.md))
- **Design & Assets**: Propriétaire - © 2025 Jonathan Gleyze

### Ce que vous POUVEZ faire:
✅ Utiliser le code pour apprendre et construire vos propres projets  
✅ Modifier et adapter le code pour vos besoins  
✅ Utiliser comme référence pour votre propre portfolio

### Ce que vous NE POUVEZ PAS faire:
❌ Cloner ce dépôt et l'utiliser tel quel pour votre portfolio  
❌ Utiliser le design, les graphiques ou le contenu sans permission  
❌ Utiliser à des fins commerciales sans autorisation explicite

**📖 Lire la licence complète**: [LICENSE.md](./LICENSE.md)

---

## 📧 Contact

N'hésitez pas à me contacter si vous avez des questions:

- 📧 **Email**: [pro.jonathan.gleyze@gmail.com](mailto:pro.jonathan.gleyze@gmail.com)
- 💼 **LinkedIn**: [Jonathan Gleyze](https://www.linkedin.com/in/jonathan-gleyze-173ab7239/)
- 🐙 **GitHub**: [@coockieHunt](https://github.com/coockieHunt)
- 🎨 **DeviantArt**: [coockiehunt](https://www.deviantart.com/coockiehunt)

---

<div align="center">

Fait avec ❤️ par Jonathan Gleyze

[⬆ Retour en haut](#-portfolio-repository-fr)

</div>

---

## 🌍 English Version

[Read this README in English](#-portfolio-repository-eng)