# Annuaire de Services de Proximité

# [▶️](https://zakari-ya.github.io/Annuaire-de-services-de-proximit-/)

Une plateforme locale permettant aux utilisateurs de consulter et d'ajouter des prestataires de services par quartier.

## Fonctionnalités du MVP

1. **Liste des prestataires** avec nom, métier, quartier et contact
2. **Filtrage** par quartier et métier
3. **Formulaire d'ajout** public avec modération manuelle
4. **Page profil** pour chaque prestataire

## Installation et exécution

1. Téléchargez les fichiers du projet
2. Ouvrez `index.html` dans votre navigateur web
3. L'application fonctionne entièrement côté client avec stockage local

## Utilisation

### Consultation des prestataires

- Utilisez les filtres en haut de page pour affiner votre recherche
- Les prestataires validés apparaissent en premier

### Ajout d'un prestataire

- Remplissez le formulaire "Ajouter un prestataire"
- Les nouveaux prestataires sont marqués "En attente de validation"
- Un administrateur doit valider pour qu'ils apparaissent publiquement

### Mode administrateur (démonstration)

Pour tester les fonctionnalités d'administration :

1. Ouvrez la console du navigateur (F12)
2. Exécutez `enableAdminMode()`
3. Les boutons de validation/suppression apparaîtront

Pour désactiver : `disableAdminMode()`

## Structure du projet

- `index.html` - Structure principale de l'application
- `style.css` - Styles et mise en page responsive
- `script.js` - Logique de l'application et gestion des données
- `README.md` - Ce fichier

## Évolution future

Voir le fichier `ROADMAP.md` pour le plan d'évolution sur 3 mois.

## Technologies utilisées

- HTML5
- CSS3 (Grid, Flexbox, Variables CSS)
- JavaScript (ES6+)
- LocalStorage pour la persistance des données
