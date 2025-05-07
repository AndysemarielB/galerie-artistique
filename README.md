# Galerie Artistique

Un site web immersif de galerie d'art numérique présentant des œuvres d'art contemporaines générées par intelligence artificielle et techniques numériques avancées.

![Galerie Artistique](public/images/metamorphosis.jpg)

## Objectif du Projet

La Galerie Artistique vise à créer une expérience immersive et interactive pour présenter des œuvres d'art numériques contemporaines. Le site met en avant l'intersection entre l'art, la technologie et l'intelligence artificielle à travers une interface utilisateur moderne et élégante.

## Technologies Utilisées

- **Framework Frontend**: Next.js 15 (React 19)
- **Styling**: TailwindCSS avec animations personnalisées
- **Animations et Interactions**: Framer Motion
- **UI Components**: Radix UI et custom components
- **Icônes**: Lucide React
- **Type Safety**: TypeScript
- **Package Manager**: pnpm

## Fonctionnalités Principales

### Expérience Utilisateur Immersive
- Curseur personnalisé fluide qui change en fonction du contexte
- Animations d'éléments réactives au défilement
- Effets de parallaxe et transitions fluides entre les pages
- Canvas d'art génératif réactif en arrière-plan

### Présentation des Œuvres
- Galerie visuelle avec effets de survol élégants
- Pages détaillées pour chaque œuvre avec zoom et exploration de détails
- Fonctionnalités sociales comme partage et "j'aime"
- Informations détaillées sur l'artiste et les spécifications de l'œuvre

### Composants Innovants
- `FluidCursor`: Curseur personnalisé fluide qui réagit au contenu
- `ParticleField`: Champ de particules interactif qui réagit aux mouvements de la souris
- `ArtCanvas`: Canvas d'art génératif avec animations dynamiques
- `TypewriterText`: Effet de machine à écrire pour les textes
- `LiquidButton`: Boutons avec effets de liquide animés

### Contact et Navigation
- Bouton de contact Instagram flottant avec animation
- Navigation fluide entre les œuvres
- Interface responsive adaptée à tous les appareils

## Structure du Projet

```
/
├── app/                # Next.js App Router
│   ├── galerie/        # Page de la galerie
│   ├── oeuvre/         # Pages des œuvres individuelles
│   │   └── [id]/       # Page dynamique d'œuvre par ID
│   └── page.tsx        # Page d'accueil
│
├── components/         # Composants React réutilisables
│   ├── art-canvas.tsx  # Canvas d'art génératif
│   ├── fluid-cursor.tsx# Curseur personnalisé
│   ├── liquid-button.tsx# Boutons avec animation liquide
│   └── ui/            # Composants UI de base
│
├── hooks/              # Hooks React personnalisés
│   ├── use-cursor-style.tsx # Gestion du style du curseur
│   └── use-mouse-position.tsx # Suivi de la position de la souris
│
├── lib/                # Utilitaires et fonctions de base
│
└── public/             # Assets statiques
    └── images/         # Images des œuvres d'art
```

## Œuvres d'Art Présentées

La galerie présente plusieurs œuvres d'art numériques contemporaines:

1. **Métamorphose** par Elena Vostrikova - Art numérique / Intelligence artificielle
2. **Rêves Digitaux** par Maxime Dubois - Photographie numérique / Manipulation digitale
3. **Échos Quantiques** par Sophia Chen - Génératif / Algorithme quantique
4. **Jardin Neural** par Léo Moreau - Réseaux de neurones / Impression sur aluminium
5. **Fragments Temporels** par Amara Diallo - Photogrammétrie / Réalité mixte

## Installation et Démarrage

```bash
# Cloner le dépôt
git clone https://github.com/votreusername/galerie-artistique.git

# Naviguer dans le dossier du projet
cd galerie-artistique

# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Maintenance et Développement

Ce projet utilise des technologies modernes pour offrir une expérience utilisateur optimale. Pour contribuer au développement:

1. Assurez-vous d'avoir Node.js 18+ et pnpm installés
2. Suivez les standards TypeScript et les conventions React modernes
3. Utilisez TailwindCSS pour le styling
4. Testez sur différents navigateurs et appareils pour assurer la compatibilité

## License

Ce projet est distribué sous licence MIT. 