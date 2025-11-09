# Services de Proximité - Annuaire Local

Une application web complète permettant de découvrir, ajouter et gérer des prestataires de services locaux.

## 📋 Description du Projet

Services de Proximité est une plateforme web qui permet aux utilisateurs de :
- Découvrir des prestataires de services locaux (artisans, commerçants, professionnels)
- Filtrer les prestataires par zone géographique et métier
- Ajouter de nouveaux prestataires à l'annuaire
- Administrer et modérer les prestataires via un panel d'administration

## 🚀 Fonctionnalités

### Pour les utilisateurs
- **Page d'accueil** avec présentation des services
- **Recherche et filtrage** par zone et métier
- **Fiches détaillées** des prestataires avec coordonnées
- **Ajout de nouveaux prestataires** via un formulaire
- **Design responsive** adapté mobile et desktop

### Pour les administrateurs
- **Tableau de bord** avec statistiques
- **Modération** des prestataires en attente de validation
- **Gestion** des prestataires validés
- **Édition** des informations des prestataires

## 🛠️ Structure du Projet

```
├── index.html              # Page d'accueil principale
├── provider.html           # Page de détails d'un prestataire
├── ajouter.html            # Formulaire d'ajout d'un prestataire
├── admin.html              # Interface d'administration
├── main.js                 # Logique principale de l'application
├── provider.js             # Gestion de la page de détails
├── ajouter.js              # Gestion du formulaire d'ajout
├── admin.js                # Logique de l'interface admin
├── styles.css              # Styles généraux et animations
├── index.css               # Styles spécifiques à l'accueil
├── provider.css            # Styles de la page de détails
├── ajouter.css             # Styles du formulaire d'ajout
├── admin.css               # Styles de l'interface admin
└── services_marrakech.json # Données de référence des prestataires
```

## 📁 Fichiers Principaux

### Pages HTML
- **index.html** - Page d'accueil avec liste des prestataires
- **provider.html** - Page de détails d'un prestataire spécifique
- **ajouter.html** - Formulaire pour ajouter un nouveau prestataire
- **admin.html** - Interface d'administration pour modération

### Scripts JavaScript
- **main.js** - Logique principale, chargement des données, gestion des filtres
- **provider.js** - Affichage des détails et prestataires similaires
- **ajouter.js** - Gestion du formulaire d'ajout et validation
- **admin.js** - Administration, modération, édition des prestataires

### Feuilles de Style
- **styles.css** - Styles généraux, animations et utilitaires
- **index.css** - Styles spécifiques à la page d'accueil
- **provider.css** - Styles pour la page de détails
- **ajouter.css** - Styles pour le formulaire d'ajout
- **admin.css** - Styles pour l'interface d'administration

## 🎯 Technologies Utilisées

- **HTML5** - Structure des pages
- **CSS3** - Styles et animations
- **JavaScript (ES6+)** - Logique applicative
- **LocalStorage** - Stockage local des données
- **JSON** - Données de référence
- **Tailwind CSS** - Framework CSS utilitaire
- **Anime.js** - Animations JavaScript
- **Google Fonts** - Typographie (Playfair Display, Inter)

## 🔧 Installation et Utilisation

1. **Cloner le repository**
   ```bash
   git clone [url-du-repository]
   ```

2. **Ouvrir dans un navigateur**
   - Ouvrir `index.html` dans un navigateur web
   - Aucune installation supplémentaire requise

3. **Utilisation**
   - Naviguer entre les différentes pages
   - Ajouter des prestataires via le formulaire
   - Accéder à l'admin via le lien "Admin"

## 📊 Gestion des Données

### Sources de données
- **JSON local** (`services_marrakech.json`) - Données de référence
- **LocalStorage** - Données utilisateur ajoutées via le formulaire

### Structure des données prestataires
```javascript
{
  id: "unique_identifier",
  name: "Nom du prestataire",
  job: "Type de service",
  zone: "Zone géographique",
  phone: "Numéro de téléphone",
  description: "Description des services",
  validated: true/false,
  image: "URL de l'image",
  source: "json/local"
}
```

## 🎨 Fonctionnalités Avancées

### Animations
- Transitions fluides entre les pages
- Animations d'apparition des éléments
- Effets de survol interactifs

### Responsive Design
- Adaptation à tous les écrans (mobile, tablette, desktop)
- Menu mobile optimisé
- Grilles flexibles

### Accessibilité
- Navigation au clavier
- Contraste des couleurs
- Structure sémantique

## 🔒 Gestion des Accès

- **Utilisateurs normaux** : Consultation et ajout de prestataires
- **Administrateurs** : Modération, validation, édition et suppression

## 📱 Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Mobile browsers

## 🚧 Développement Futur

- [ ] Système d'authentification
- [ ] Recherche en temps réel
- [ ] Système de notation et avis
- [ ] Géolocalisation
- [ ] Notifications push
- [ ] Mode hors-ligne

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository GitHub.

---

**Développé avec ❤️ pour faciliter l'accès aux services locaux**
