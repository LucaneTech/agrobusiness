# KFK Agro Business — Site Web

**Ensemble, cultivons l'avenir**

Site web professionnel et moderne pour KFK Agro Business, projet agricole intégré en République Démocratique du Congo.

---

## Stack Technique

- **React 18** + **TypeScript**
- **Tailwind CSS** pour le style
- **Framer Motion** pour les animations
- **React Router DOM** pour la navigation
- **Lucide React** pour les icônes
- **Vite** comme bundler

---

## Pages incluses

| Page | Route |
|------|-------|
| Accueil | `/` |
| Le Projet | `/projet` |
| Impact Social | `/impact-social` |
| Nos Activités | `/nos-activites` |
| Galerie | `/galerie` |
| **Partenaires** | `/partenaires` |
| Contact | `/contact` |

---

## Installation & Démarrage

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en mode développement
npm run dev

# 3. Construire pour la production
npm run build

# 4. Prévisualiser le build de production
npm run preview
```

Le site sera accessible à l'adresse : **http://localhost:5173**

---

## Personnalisation

### Informations de contact
Dans les fichiers suivants, remplacer les informations de contact :
- Numéro WhatsApp : `+243970000000` → votre numéro réel
- Email : `kfkagrobusiness@gmail.com` → votre email réel
- Adresse : modifier dans `src/components/Footer.tsx`

### Logo
Le logo est dans `public/logo.jpg`. Remplacez-le par votre logo haute résolution.

### Couleurs
Les couleurs principales sont définies dans `tailwind.config.js` :
- **Vert principal** : palette `kfk.green`
- **Orange accent** : palette `kfk.orange`

### Images
Les images proviennent d'Unsplash (libres de droits). Pour utiliser vos propres photos :
1. Placer vos images dans `public/images/`
2. Remplacer les URLs Unsplash par `/images/votre-photo.jpg`

---

## Structure du projet

```
kfk-agrobusiness/
├── public/
│   └── logo.jpg              # Logo KFK
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation
│   │   ├── Footer.tsx         # Pied de page
│   │   ├── WhatsAppButton.tsx # Bouton WhatsApp flottant
│   │   └── PageHero.tsx       # Bannière de page réutilisable
│   ├── pages/
│   │   ├── Home.tsx           # Page Accueil
│   │   ├── Project.tsx        # Page Le Projet
│   │   ├── SocialImpact.tsx   # Page Impact Social
│   │   ├── Activities.tsx     # Page Nos Activités
│   │   ├── Gallery.tsx        # Page Galerie
│   │   ├── Partners.tsx       # Page Partenaires ★
│   │   └── Contact.tsx        # Page Contact
│   ├── App.tsx                # Routeur principal
│   ├── main.tsx               # Point d'entrée
│   └── index.css              # Styles globaux
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Déploiement

### Option 1 — Netlify (recommandé)
1. Pusher le projet sur GitHub
2. Connecter à Netlify
3. Build command : `npm run build`
4. Publish directory : `dist`

### Option 2 — Vercel
1. Pusher sur GitHub
2. Importer dans Vercel
3. Le déploiement est automatique

### Option 3 — Hébergement statique
```bash
npm run build
# Uploader le dossier `dist/` sur votre hébergeur
```

---

© 2024 KFK Agro Business. Tous droits réservés.
