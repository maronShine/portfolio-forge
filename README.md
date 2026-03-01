# PortfolioForge 🚀

Une plateforme web complète qui permet à chaque professionnel de créer, gérer et partager son portfolio digital moderne.

## 🌟 Fonctionnalités

### 🏠 Portfolio d'Emmanuel Nduwayo Bagi
- Page d'accueil professionnelle avec design dark premium
- Hero section avec statistiques animées
- Sections complètes : À propos, Services, Positionnement, Processus, Contact
- Formulaire de contact fonctionnel
- Call-to-action vers la création de portfolio

### 🔐 Système d'Authentification
- Inscription avec validation complète
- Connexion sécurisée avec tokens JWT
- Gestion des erreurs et redirections automatiques
- Interface responsive et accessible

### 📊 Dashboard Utilisateur
- Interface de gestion des portfolios
- Statistiques en temps réel
- CRUD complet (Créer, Lire, Modifier, Supprimer)
- Partage avec copie automatique des liens
- Design moderne et intuitif

### 🧙‍♂️ Wizard de Création de Portfolio
- **7 étapes complètes** avec validation en temps réel :
  1. **Identité & Hero** - Photo, statistiques, CTA
  2. **À propos** - Bio, différenciateurs, valeurs
  3. **Services** - Ajout dynamique avec détails complets
  4. **Expériences** - Parcours professionnel
  5. **Projets** - Études de cas avec images
  6. **Compétences** - Skills, outils, certifications, langues
  7. **Contact** - Coordonnées et disponibilité

### 👁️ Prévisualisation en Temps Réel
- Panneau latéral avec aperçu live
- Mise à jour automatique pendant la saisie
- Mode plein écran disponible
- Navigation entre étapes préservant les données

### 📄 Visualisation Publique
- URLs uniques et partageables
- Affichage élégant de toutes les sections
- Fonction d'impression intégrée
- Export PDF avec html2canvas + jsPDF
- Boutons de partage et impression
- Mode responsive parfait

## 🛠️ Stack Technique

### Frontend
- **React 18** avec Vite
- **Tailwind CSS** pour le design
- **React Router** pour la navigation
- **Axios** pour les appels API
- **React Hot Toast** pour les notifications
- **Heroicons** pour les icônes
- **html2canvas + jsPDF** pour l'export PDF

### Backend
- **Node.js** avec Express.js
- **JWT** pour l'authentification
- **bcryptjs** pour le hashage des mots de passe
- **Prisma** ORM (prêt pour PostgreSQL)
- **CORS** et **Helmet** pour la sécurité
- **Morgan** pour le logging

### Design System
- Thème **dark premium**
- Palette de couleurs personnalisée
- Typographie : Syne + DM Sans (Google Fonts)
- Composants réutilisables
- Animations fluides CSS

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd portfolio-forge
```

2. **Installer les dépendances**
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. **Démarrer les serveurs**

Backend (port 5000) :
```bash
cd server
npm run dev
```

Frontend (port 5173) :
```bash
cd client
npm run dev
```

4. **Accéder à l'application**
- Frontend : http://localhost:5173
- API Backend : http://localhost:5000/api/health

## 📁 Structure du Projet

```
portfolio-forge/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── Layout/       # Navbar, Footer
│   │   │   └── PortfolioForm/ # Wizard étapes
│   │   ├── pages/            # Pages principales
│   │   ├── context/          # AuthContext
│   │   ├── hooks/            # Hooks personnalisés
│   │   ├── services/         # Appels API
│   │   └── utils/           # Utilitaires
│   ├── public/
│   └── package.json
├── server/                   # Node.js backend
│   ├── routes/               # Routes API
│   ├── middleware/           # Middleware auth
│   ├── prisma/              # Schéma base de données
│   └── index.js             # Serveur principal
└── README.md
```

## 🔧 Configuration

### Variables d'Environnement

Créer un fichier `.env` dans le dossier `server` :

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolioforge"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRE="7d"

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:5173"
```

## 🎯 Utilisation

### 1. Créer un Compte
1. Allez sur `/register`
2. Remplissez le formulaire d'inscription
3. Vérifiez votre email (si activé)

### 2. Se Connecter
1. Allez sur `/login`
2. Entrez vos identifiants
3. Accédez à votre dashboard

### 3. Créer un Portfolio
1. Depuis le dashboard, cliquez sur "Créer un portfolio"
2. Suivez le wizard en 7 étapes
3. Prévisualisez en temps réel
4. Sauvegardez votre portfolio

### 4. Partager votre Portfolio
1. Votre portfolio est accessible via `/portfolio/[slug]`
2. Utilisez les boutons de partage et d'export
3. Imprimez ou exportez en PDF

## 🌟 Points Forts

- **UX Exceptionnelle** : Wizard intuitif avec validation en temps réel
- **Design Moderne** : Thème dark premium avec animations fluides
- **Fonctionnalité Complète** : CRUD, authentification, partage, impression
- **Code Quality** : Architecture propre, composants modulaires
- **Responsive** : Mobile-first, fonctionne sur tous les appareils
- **Sécurité** : Validation des entrées, tokens JWT
- **Performance** : Lazy loading, code splitting React

## 🔄 Fonctionnalités en Développement

- [ ] Upload d'images avec Cloudinary
- [ ] Templates de portfolio prédéfinis
- [ ] Analytics et statistiques avancées
- [ ] Notifications par email
- [ ] Mode collaboration (teams)
- [ ] Intégration avec LinkedIn

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.

## 👨‍💻 Auteur

**Emmanuel Nduwayo Bagi** - Architecte de Systèmes CRM & ERP
- LinkedIn : [linkedin.com/in/emmanuel-bagi-n](https://linkedin.com/in/emmanuel-bagi-n)
- Email : emmanuel.bagi.n@gmail.com

---

⭐ Si ce projet vous a plu, n'hésitez pas à le soutenir avec une étoile !
