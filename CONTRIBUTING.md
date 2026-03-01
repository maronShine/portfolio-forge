# 🤝 Contribuer à PortfolioForge

Merci de votre intérêt pour contribuer à PortfolioForge ! Ce guide vous aidera à démarrer.

---

## 📋 Table des Matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Développement](#développement)
- [Tests](#tests)
- [Soumission de Contributions](#soumission-de-contributions)
- [Guidelines de Code](#guidelines-de-code)
- [Rapports de Bugs](#rapports-de-bugs)
- [Demandes de Fonctionnalités](#demandes-de-fonctionnalités)

---

## 🎯 Prérequis

- **Node.js** 18+
- **npm** 8+
- **Git**
- Connaissance de :
  - React.js
  - Node.js/Express.js
  - Tailwind CSS
  - JWT authentication

---

## ⚡ Installation

### 1. Forker le Projet
```bash
# Forker sur GitHub, puis cloner
git clone https://github.com/VOTRE_USERNAME/portfolio-forge.git
cd portfolio-forge
```

### 2. Installer les Dépendances
```bash
npm run install:all
```

### 3. Démarrer le Développement
```bash
npm run dev
```

---

## 📁 Structure du Projet

```
portfolio-forge/
├── client/                    # Frontend React
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
├── server/                   # Backend Node.js
│   ├── routes/               # Routes API
│   ├── middleware/           # Middleware auth
│   ├── prisma/              # Schéma BDD
│   └── index.js             # Serveur principal
├── docs/                    # Documentation
├── tests/                   # Tests
└── scripts/                 # Scripts utilitaires
```

---

## 🛠️ Développement

### Frontend (React)

#### Nouvelle Page
```bash
# Créer le fichier
touch client/src/pages/NouvellePage.jsx

# Ajouter la route
# Dans client/src/App.jsx
<Route path="/nouvelle-page" element={<NouvellePage />} />
```

#### Nouveau Composant
```jsx
// client/src/components/NouveauComposant.jsx
import React from 'react';

const NouveauComposant = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary">
        Nouveau Composant
      </h1>
    </div>
  );
};

export default NouveauComposant;
```

#### Styles Tailwind
```jsx
// Utiliser les classes utilitaires
<div className="card p-4 bg-dark-primary border-border">
  <h2 className="text-accent-green">Titre</h2>
</div>
```

### Backend (Node.js)

#### Nouvelle Route API
```javascript
// server/routes/nouvelleRoute.js
const express = require('express');
const router = express.Router();

// GET /api/nouvelle-route
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Nouvelle route' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

#### Ajouter au Serveur
```javascript
// Dans server/index.js
app.use('/api/nouvelle-route', require('./routes/nouvelleRoute'));
```

#### Middleware d'Authentification
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## 🧪 Tests

### Exécuter les Tests
```bash
# Tests API complets
npm test

# Tests manuels
node test-api.js
```

### Ajouter des Tests
```javascript
// Dans test-api.js
async function testNewFeature() {
  log('🧪 Testing New Feature...');
  try {
    const response = await axios.get(`${API_BASE}/new-feature`);
    if (response.status === 200) {
      log('✅ New feature test passed');
      return true;
    }
  } catch (error) {
    log(`❌ New feature test failed: ${error.message}`, 'ERROR');
    return false;
  }
}
```

---

## 📤 Soumission de Contributions

### 1. Créer une Branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 2. Faire les Changements
```bash
# Ajouter les fichiers
git add .

# Commiter avec message clair
git commit -m "feat: ajouter nouvelle fonctionnalité"

# Pusher
git push origin feature/nouvelle-fonctionnalite
```

### 3. Pull Request
- Ouvrir une PR sur GitHub
- Utiliser le template de PR
- Attendre la review

---

## 📋 Guidelines de Code

### Conventions de Nommage

#### Fichiers
- **Composants** : `PascalCase.jsx` (`UserProfile.jsx`)
- **Pages** : `PascalCase.jsx` (`Dashboard.jsx`)
- **Hooks** : `camelCase.js` (`useAuth.js`)
- **Utilitaires** : `camelCase.js` (`api.js`)

#### Variables
```javascript
// ✅ Bon
const userProfile = getUserData();
const isLoading = false;

// ❌ Mauvais
const user_profile = getUserData();
const loading = false;
```

#### Fonctions
```javascript
// ✅ Bon
const handleSubmitForm = () => {
  // ...
};

// ❌ Mauvais
const handle_submit_form = () => {
  // ...
};
```

### Structure des Composants React
```jsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// 2. Composant principal
const ComponentName = ({ prop1, prop2 }) => {
  // 3. Hooks
  const [state, setState] = useState(null);
  const { user } = useAuth();

  // 4. Effets
  useEffect(() => {
    // ...
  }, []);

  // 5. Handlers
  const handleClick = () => {
    // ...
  };

  // 6. Render
  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  );
};

// 7. Export
export default ComponentName;
```

### Messages de Commit
```bash
# Format : type: description

feat: ajouter nouvelle fonctionnalité
fix: corriger bug de connexion
docs: mettre à jour README
style: améliorer design du formulaire
refactor: optimiser le code
test: ajouter tests pour l'API
chore: mettre à jour les dépendances
```

---

## 🐛 Rapports de Bugs

### Comment Rapporter un Bug

1. **Vérifier les issues existantes**
   - Chercher dans [Issues](https://github.com/emmanuelbagi/portfolio-forge/issues)

2. **Créer une nouvelle Issue**
   - Utiliser le template "Bug Report"
   - Fournir :
     - Titre clair
     - Description détaillée
     - Étapes pour reproduire
     - Screenshots si possible
     - Environnement (OS, navigateur)

3. **Informations à inclure**
   ```markdown
   ## Description
   Description claire du bug
   
   ## Étapes pour Reproduire
   1. Aller sur...
   2. Cliquer sur...
   3. Observer...
   
   ## Comportement Attendu
   Ce qui devrait se passer
   
   ## Comportement Actuel
   Ce qui se passe réellement
   
   ## Environnement
   - OS: Windows 10
   - Navigateur: Chrome 120
   - Version: v1.0.0
   ```

---

## 💡 Demandes de Fonctionnalités

### Proposer une Fonctionnalité

1. **Vérifier les demandes existantes**
   - Chercher dans [Issues](https://github.com/emmanuelbagi/portfolio-forge/issues)

2. **Créer une nouvelle Issue**
   - Utiliser le template "Feature Request"
   - Fournir :
     - Titre clair
     - Description du besoin
     - Cas d'usage
     - Proposition d'implémentation

3. **Template de Feature Request**
   ```markdown
   ## Description
   Description de la fonctionnalité souhaitée
   
   ## Problème Résolu
   Quel problème cette fonctionnalité résout-elle ?
   
   ## Solution Proposée
   Comment vous voyez l'implémentation ?
   
   ## Alternatives
   Autres solutions envisagées
   
   ## Cas d'Usage
   Comment les utilisateurs utiliseraient cette fonctionnalité ?
   ```

---

## 🏆 Reconnaissances

### Contributeurs
Tous les contributeurs seront listés dans :
- `README.md` (section Contributeurs)
- `CONTRIBUTORS.md`
- Releases notes

### Types de Contributions
- **Code** : Nouvelles fonctionnalités, corrections
- **Documentation** : Amélioration des docs
- **Tests** : Ajout de tests
- **Design** : UI/UX improvements
- **Traductions** : Support multilingue
- **Bug Reports** : Identification et rapports

---

## 📞 Support

### Pour les Contributeurs
- **Discord** : [Lien du serveur]
- **Email** : emmanuel.bagi.n@gmail.com
- **GitHub Issues** : Pour questions techniques

### Ressources
- **Documentation** : `README.md`
- **Quick Start** : `QUICKSTART.md`
- **API Tests** : `test-api.js`
- **Déploiement** : `deploy.sh` / `deploy.ps1`

---

## 🎉 Merci !

Merci de contribuer à PortfolioForge ! Votre aide rend ce projet meilleur pour toute la communauté.

**Chaque contribution compte !** 🚀

---

### Checklist avant de Soumettre

- [ ] Code suit les guidelines
- [ ] Tests passent
- [ ] Documentation mise à jour
- [ ] Commit messages clairs
- [ ] Pull request complète

**Prêt à contribuer ? Forkez le projet et commencez !** 💪
