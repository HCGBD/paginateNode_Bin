// --- Importations ---

// Importe le modele Mongoose pour les Auteurs. C'est notre interface avec la collection 'auteurs' dans MongoDB.
const Auteurs = require("../models/Auteurs");
const AutheurValidator = require("../validators/AutheursValidator");

// --- Fonctions du Controleur ---

/**
 * Cree un nouvel auteur en se basant sur les donnees recues dans le corps de la requete.
 * @param {object} req - L'objet de la requete Express, contenant les donnees du client (req.body).
 * @param {object} res - L'objet de la reponse Express, utilise pour renvoyer une reponse au client.
 */
const create = async (req, res) => {
  try {
    // Extrait les proprietes nom, prenom et dateNaiss du corps de la requete.
    let { nom, prenom, dateNaiss } = req.body;

    // Convertit la date de naissance (qui est une chaine de caracteres) en un format de date valide.
    dateNaiss = Date.parse(dateNaiss);
    const dataInsert = { nom, prenom, dateNaiss };
    // Utilise la methode statique create de Mongoose pour creer et sauvegarder un nouvel auteur en une seule etape.

    const { error, value } = AutheurValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((err) => err.message);
      res.status(401).json(message);
    }
    const data = await Auteurs.create(value);

    // Renvoie une reponse avec le statut 201 (Created) et les donnees de l'auteur cree au format JSON.
    res.status(201).json(data);
  } catch (error) {
    // En cas d'erreur (par exemple, une erreur de validation), l'affiche dans la console.
    // Pour une application en production, il serait preferable de renvoyer une reponse d'erreur a l'utilisateur.
    console.log(error);
  }
};

/**
 * Recupere et renvoie la liste complete de tous les auteurs.
 * NOTE : Cette fonction n'est actuellement pas utilisee par les routes.
 */
const list = async (req, res) => {
  try {
    // Utilise la methode find({}) de Mongoose pour recuperer tous les documents de la collection Auteurs.
    const data = await Auteurs.find({});
    // Renvoie une reponse avec le statut 200 (OK) et la liste des auteurs au format JSON.
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Recupere un auteur specifique par son identifiant unique (_id).
 */
const listById = async (req, res) => {
  try {
    // Recupere l'identifiant _id depuis les parametres de l'URL (ex: /auteurs/12345).
    const _id = req.params._id;
    // Utilise la methode findOne pour trouver le premier document qui correspond au critere de filtre.
    const data = await Auteurs.findOne({ _id });
    // Renvoie une reponse avec le statut 200 (OK) et les donnees de l'auteur trouve.
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Recupere une liste paginee d'auteurs.
 * Utilise le plugin mongoose-paginate-v2 pour une pagination efficace.
 */
const listPagi = async (req, res) => {
  try {
    // Recupere le numero de la page et la limite d'elements par page depuis les parametres de la requete d'URL.
    // Des valeurs par defaut (page 1, limite 5) sont utilisees si les parametres ne sont pas fournis.
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || 'nom';
    const order = req.query.order === 'desc' ? -1 : 1;

    // Definit les options pour la pagination.

    const options = {
      page,
      limit,
      sort: { [sortBy]: order },
      lean: true, // Optimisation : renvoie des objets JS simples au lieu de documents Mongoose complets.
      customLabels: {
        // Personnalise les noms des cles dans la reponse JSON.
        totalDocs: "total",
        docs: "Auteurs",
        limit: "limit",
        page: "page",
        nextPage: "next",
        prevPage: "prev",
        totalPages: "pages",
        pagingCounter: "serial",
        meta: "pagination", // Regroupe toutes les metadonnees de pagination dans un objet 'pagination'.
      },
    };

    // Appelle la methode paginate du modele Auteurs pour recuperer les donnees.
    const result = await Auteurs.paginate({}, options);

    // Construit l'URL de base pour les liens de navigation.
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const makeLink = (p) => `${baseUrl}?page=${p}&limit=${limit}`;

    // Ajoute les liens de navigation (self, next, prev, first, last) a l'objet de pagination.
    result.pagination.links = {
      self: makeLink(result.pagination.page),
      next: result.pagination.next ? makeLink(result.pagination.next) : null,
      prev: result.pagination.prev ? makeLink(result.pagination.prev) : null,
      first: makeLink(1),
      last: makeLink(result.pagination.pages),
    };

    // Renvoie le resultat complet (contenant les auteurs et les informations de pagination) au format JSON.
    res.json(result);
  } catch (err) {
    // En cas d'erreur, renvoie un statut 500 (Erreur Interne du Serveur) et le message d'erreur.
    res.status(500).json({ error: err.message });
  }
};

/**
 * Met a jour un auteur existant.
 */
const update = async (req, res) => {
  try {
    let { nom, prenom, dateNaiss } = req.body;
    dateNaiss = Date.parse(dateNaiss);
    const _id = req.params._id;

    // Trouve un auteur par son _id et le met a jour avec les nouvelles donnees.
    const data = await Auteurs.findOneAndUpdate(
      { _id: _id }, // Filtre pour trouver le document a mettre a jour.
      { nom, prenom, dateNaiss }, // Les nouvelles donnees.
      { new: true, runValidators: true } // Options : `new: true` pour renvoyer le document mis a jour, `runValidators: true` pour appliquer les validations du schema.
    );
    // Renvoie le document mis a jour.
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Supprime un auteur par son identifiant.
 */
const deleteA = async (req, res) => {
  try {
    const _id = req.params._id;
    // Trouve un auteur par son _id et le supprime.
    const data = await Auteurs.findOneAndDelete({ _id });
    // Renvoie les donnees de l'auteur qui vient d'etre supprime.
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

// --- Exportations ---

// Exporte toutes les fonctions du controleur pour qu'elles puissent etre utilisees par le routeur.
module.exports = {
  create,
  list,
  listById,
  update,
  deleteA,
  listPagi,
};