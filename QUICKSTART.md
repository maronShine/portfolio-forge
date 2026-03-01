# 🚀 PortfolioForge - Guide de Démarrage Rapide

## 📋 Prérequis

- **Node.js** 18+ 
- **npm** 8+
- **Git** (optionnel)

---

## ⚡ Installation en 2 Minutes

### 1. Cloner et Installer
```bash
git clone <repository-url>
cd portfolio-forge
npm run install:all
```

### 2. Démarrer les Serveurs
```bash
npm run dev
```

### 3. Accéder à l'Application
- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:5000/api/health

---

## 🎯 Utilisation Immédiate

### 1. Créer un Compte
1. Allez sur http://localhost:5173/register
2. Remplissez le formulaire d'inscription
3. Vérifiez votre email (si activé)

### 2. Se Connecter
1. Allez sur http://localhost:5173/login
2. Entrez vos identifiants
3. Accédez à votre dashboard

### 3. Créer un Portfolio
1. Depuis le dashboard, cliquez sur "Créer un portfolio"
2. Suivez le wizard en 7 étapes :
   - **Étape 1** : Identité & Photo
   - **Étape 2** : À propos & Valeurs
   - **Étape 3** : Services offerts
   - **Étape 4** : Expériences professionnelles
   - **Étape 5** : Projets et réalisations
   - **Étape 6** : Compétences et outils
   - **Étape 7** : Contact et disponibilité
3. Prévisualisez en temps réel à droite
4. Cliquez sur "Créer le portfolio"

### 4. Partager votre Portfolio
1. Votre portfolio est accessible via : `/portfolio/[votre-slug]`
2. Utilisez les boutons :
   - **Partager** : Copier le lien
   - **Imprimer** : Impression navigateur
   - **Exporter PDF** : Télécharger en PDF

---

## 🛠️ Commandes Utiles

### Développement
```bash
npm run dev              # Les deux serveurs
npm run dev:client        # Frontend seul
npm run dev:server       # Backend seul
```

### Tests
```bash
npm test                 # Tests API complets
node test-api.js         # Tests manuels
```

### Déploiement
```bash
npm run setup            # Configuration environnement
npm run deploy:all       # Déploiement complet
npm run deploy:vercel    # Frontend Vercel
npm run deploy:railway   # Backend Railway
```

---

## 🔧 Configuration

### Variables d'Environnement

Créez `server/.env` :
```env
DATABASE_URL="postgresql://username:password@localhost:5432/portfolioforge"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRE="7d"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

Créez `client/.env` :
```env
VITE_API_URL="http://localhost:5000/api"
```

---

## 🌐 Déploiement en Production

### 1. Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

### 2. Backend (Railway)
```bash
cd server
railway login
railway deploy
```

### 3. Automatisé
```bash
npm run deploy:all
```

---

## 📱 Fonctionnalités

### ✅ Portfolio Emmanuel
- Page d'accueil professionnelle
- Design dark premium
- Formulaire de contact

### ✅ Authentification
- Inscription avec validation
- Connexion sécurisée JWT
- Gestion des sessions

### ✅ Dashboard
- Gestion des portfolios
- Statistiques en temps réel
- CRUD complet

### ✅ Wizard 7 Étapes
- Identité & Hero
- À propos & Valeurs
- Services
- Expériences
- Projets
- Compétences
- Contact

### ✅ Visualisation Publique
- URLs uniques
- Affichage élégant
- Impression optimisée
- Export PDF

---

## 🎨 Personnalisation

### Couleurs (Tailwind)
```css
--color-primary: #0A0F1E;
--accent-green: #00C9A7;
--accent-blue: #1A4D8F;
```

### Polices
- **Titres** : Syne
- **Texte** : DM Sans

### Composants
- Boutons : `btn-primary`, `btn-secondary`, `btn-ghost`
- Cards : `card`
- Badges : `badge`

---

## 🐛 Dépannage

### Problèmes Communs

**Port déjà utilisé ?**
```bash
# Changer le port frontend
npm run dev -- --port 3000

# Changer le port backend
PORT=3001 npm run dev:server
```

**Erreur Tailwind ?**
```bash
cd client
npm install @tailwindcss/postcss
```

**Routes not found ?**
```bash
cd server
npm run dev
# Vérifiez que index-simple.js est utilisé
```

### Logs
```bash
# Logs backend
cd server && npm run dev

# Logs frontend  
cd client && npm run dev
```

---

## 📞 Support

### Documentation Complète
- `README.md` : Documentation technique
- `test-api.js` : Tests automatisés
- `deploy.sh` / `deploy.ps1` : Scripts déploiement

### Tests de Fonctionnement
```bash
# Tester toute l'API
node test-api.js

# Résultat attendu : 8/8 tests passés
```

---

## 🎉 C'est Parti !

Vous avez maintenant :
- ✅ PortfolioForge installé et fonctionnel
- ✅ Accès à toutes les fonctionnalités
- ✅ Scripts de déploiement prêts
- ✅ Documentation complète

**Créez votre premier portfolio en moins de 5 minutes !** 🚀

---

### Liens Utiles
- **Application** : http://localhost:5173
- **API Health** : http://localhost:5000/api/health
- **Documentation** : README.md
- **Tests** : node test-api.js

**PortfolioForge - Créez votre portfolio professionnel en quelques clics !** 💼
