# API de Gestion de Bibliothèque

Cette application est une API RESTful construite avec Node.js, Express, et MongoDB. Elle permet de gérer une collection de livres et d'auteurs, avec un système d'authentification sécurisé par jetons JWT et la possibilité d'uploader des fichiers pour les livres.

## Fonctionnalités

- **Gestion des Auteurs :** Opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) complètes pour les auteurs.
- **Gestion des Livres :** Opérations CRUD complètes pour les livres.
- **Authentification :** Système d'authentification sécurisé basé sur les jetons JWT (`/register`, `/login`).
- **Upload de Fichiers :** Possibilité d'uploader un fichier (PDF) lors de la création d'un livre.
- **Relations :** Lister tous les livres d'un auteur spécifique.
- **Pagination :** Pagination sur les listes d'auteurs et de livres.
- **Sécurité :**
  - Utilisation de `helmet` pour sécuriser les en-têtes HTTP.
  - Limitation de débit (`rate-limit`) pour prévenir les abus.
  - Validation des données avec `joi`.
- **CORS :** Pré-configuré pour accepter les requêtes cross-origin.
- **Logging :** Logging des requêtes HTTP avec `morgan`.

---

## Prérequis

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure recommandée)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## Installation

1.  **Clonez le dépôt :**
    ```bash
    git clone <url_du_depot>
    cd pWeek_binome
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    ```

3.  **Configurez les variables d'environnement :**
    - Créez un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example`.
    - Remplissez les valeurs nécessaires :
      ```
      DB_URI=mongodb://localhost:27017/votre_base_de_donnees
      JWT_SECRET=votre_cle_secrete_tres_longue_et_aleatoire
      PORT=5000
      ```

---

## Lancement de l'application

- **Pour le développement (avec rechargement automatique) :**
  ```bash
  npm run dev
  ```

- **Pour la production :**
  ```bash
  npm start
  ```

L'API sera alors accessible à l'adresse `http://127.0.0.1:5000` (ou le port que vous avez défini).

---

## Documentation de l'API

**Note :** Toutes les routes (sauf `/auth/login` et `/auth/register`) nécessitent un jeton d'authentification. Vous devez l'inclure dans l'en-tête de vos requêtes :
`Authorization: Bearer <votre_jeton_jwt>`

### Authentification (`/auth`)

- **`POST /auth/register`**
  - **Description :** Enregistre un nouvel utilisateur.
  - **Corps (`JSON`) :** `{ "username": "votre_nom", "password": "votre_mot_de_passe" }`

- **`POST /auth/login`**
  - **Description :** Connecte un utilisateur et retourne un jeton JWT.
  - **Corps (`JSON`) :** `{ "username": "votre_nom", "password": "votre_mot_de_passe" }`

### Auteurs (`/auteurs`)

- **`GET /auteurs`**
  - **Description :** Récupère une liste paginée de tous les auteurs.
  - **Requiert l'authentification :** Oui.

- **`GET /auteurs/:_id`**
  - **Description :** Récupère un auteur spécifique par son ID.
  - **Requiert l'authentification :** Oui.

- **`GET /auteurs/:_id/livres`**
  - **Description :** Récupère la liste de tous les livres d'un auteur spécifique.
  - **Requiert l'authentification :** Oui.

- **`POST /auteurs`**
  - **Description :** Crée un nouvel auteur.
  - **Requiert l'authentification :** Oui.
  - **Corps (`JSON`) :** `{ "nom": "NomAuteur", "prenom": "PrenomAuteur", "dateNaiss": "YYYY-MM-DD" }`

- **`PUT /auteurs/:_id`**
  - **Description :** Met à jour un auteur existant.
  - **Requiert l'authentification :** Oui.
  - **Corps (`JSON`) :** `{ "nom": "NouveauNom", ... }`

- **`DELETE /auteurs/:_id`**
  - **Description :** Supprime un auteur.
  - **Requiert l'authentification :** Oui.

### Livres (`/livres`)

- **`GET /livres`**
  - **Description :** Récupère une liste paginée de tous les livres.
  - **Requiert l'authentification :** Oui.

- **`GET /livres/:_id`**
  - **Description :** Récupère un livre spécifique par son ID.
  - **Requiert l'authentification :** Oui.

- **`POST /livres`**
  - **Description :** Crée un nouveau livre avec la possibilité d'uploader un fichier.
  - **Requiert l'authentification :** Oui.
  - **Corps (`Multipart/Form-Data`) :**
    - `nom` (texte)
    - `description` (texte)
    - `autheur` (ID de l'auteur)
    - `fichier` (fichier, ex: un PDF)

- **`PUT /livres/:_id`**
  - **Description :** Met à jour les informations d'un livre.
  - **Requiert l'authentification :** Oui.
  - **Corps (`JSON`) :** `{ "nom": "NouveauTitre", ... }`

- **`DELETE /livres/:_id`**
  - **Description :** Supprime un livre.
  - **Requiert l'authentification :** Oui.