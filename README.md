# Zirin - Application Mobile de Contes et Légendes du Mali

## Description du Projet

Zirin est une application mobile développée en React qui vise à préserver et transmettre le patrimoine oral malien à travers des contes (Zirin) et des devinettes (Tintin). L'application utilise une architecture Domain-Driven Design (DDD) pour assurer une maintenabilité et une évolutivité optimales.

## Architecture DDD

L'application suit les principes de Domain-Driven Design avec une séparation claire en couches :

### Structure des Dossiers

```
src/
├── core/                         # Code partagé entre toutes les features
│   ├── constants/               # Constantes globales
│   ├── error/                   # Gestion des erreurs
│   ├── network/                 # Gestion de la connectivité
│   ├── theme/                   # Thèmes et couleurs
│   ├── utils/                   # Utilitaires
│   └── di/                      # Injection de dépendances
├── features/                    # Fonctionnalités principales
│   ├── conte/                   # Feature : Gestion des contes
│   │   ├── data/               # Couche de données
│   │   │   ├── datasources/    # Sources de données (local/remote)
│   │   │   ├── models/         # Modèles de données
│   │   │   └── repositories/   # Implémentations des repositories
│   │   ├── domain/             # Couche domaine (logique métier)
│   │   │   ├── entities/       # Entités métier
│   │   │   ├── repositories/   # Interfaces des repositories
│   │   │   └── usecases/       # Cas d'usage
│   │   └── presentation/       # Couche présentation
│   │       ├── components/     # Composants UI
│   │       ├── hooks/          # Hooks React personnalisés
│   │       └── pages/          # Pages/Écrans
│   ├── devinette/              # Feature : Gestion des devinettes
│   ├── auth/                   # Feature : Authentification
│   └── subscription/           # Feature : Gestion des abonnements
└── shared/                     # Composants partagés entre features
    ├── data/                   # Utilitaires de données partagés
    └── domain/                 # Classes de base du domaine
```

### Principes DDD Appliqués

1. **Séparation des Couches** : Chaque couche a une responsabilité claire
2. **Inversion de Dépendances** : Les couches supérieures ne dépendent pas des couches inférieures
3. **Use Cases** : Chaque action utilisateur est représentée par un Use Case
4. **Entities** : Objets métier sans dépendances externes
5. **Repository Pattern** : Abstraction de l'accès aux données

## Fonctionnalités Principales

### Contes (Zirin)
- Affichage des contes avec images générées par IA
- Lecture audio bilingue (Français/Bambara)
- Mode de lecture page par page ou continu
- Recherche et filtrage par catégorie
- Téléchargement pour lecture hors ligne (Premium)

### Devinettes (Tintin)
- Système de questions-réponses interactif
- Gamification avec système de points
- Classement par difficulté
- Indices payants avec les points gagnés

### Authentification
- Connexion Google Sign-In
- Gestion des profils utilisateur
- Synchronisation des préférences

### Abonnements
- Mode gratuit avec contenu limité
- Mode Premium avec accès complet
- Gestion des abonnements

## Installation et Développement

### Prérequis
- Node.js 18+ et npm
- Git

### Installation

```bash
# Cloner le repository
git clone <URL_DU_REPO>
cd zirin-app

# Installer les dépendances
npm i

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Aperçu du build
npm run lint         # Linting du code
```

## Technologies Utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **React Router** pour la navigation

### Architecture
- **Domain-Driven Design (DDD)**
- **Clean Architecture**
- **Repository Pattern**
- **Dependency Injection**

### Stockage et Backend
- **IndexedDB** pour le stockage local
- **Firebase** pour le backend (authentification, base de données)
- **API REST** pour les communications serveur

## Workflow de Développement

### Ajout d'une Nouvelle Feature

1. **Créer les Entités** dans `domain/entities/`
2. **Définir les Interfaces Repository** dans `domain/repositories/`
3. **Implémenter les Use Cases** dans `domain/usecases/`
4. **Créer les Data Sources** dans `data/datasources/`
5. **Implémenter les Repositories** dans `data/repositories/`
6. **Configurer l'Injection de Dépendances**
7. **Créer les Hooks React** dans `presentation/hooks/`
8. **Développer les Composants UI** dans `presentation/components/`
9. **Créer les Pages** dans `presentation/pages/`

### Bonnes Pratiques

- Une feature = un dossier
- Dépendances unidirectionnelles (Presentation → Domain → Data)
- Entities sans dépendances externes
- Use Cases simples et focalisés
- Interfaces avant implémentations
- Tests unitaires pour chaque couche

## Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.