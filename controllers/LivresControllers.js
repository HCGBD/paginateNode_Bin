// --- Importations ---
const Livres = require("../models/Livres");
const LivresValidator = require("../validators/LivresValidator");

// --- Fonctions du Controleur ---

/**
 * Cree un nouveau livre avec un fichier upload.
 */
const create = async (req, res) => {
  try {
    // Valide les donnees textuelles du corps de la requete.
    const { error, value } = LivresValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(400).json({ errors: message });
    }

    // Prepare les donnees a inserer en base.
    const livreData = { ...value };

    // Si un fichier a ete uploade, ajoute son chemin aux donnees.
    if (req.file) {
        livreData.fichierPath = req.file.path;
    }

    // Cree et sauvegarde le nouveau livre.
    const data = await Livres.create(livreData);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Recupere une liste paginee de livres.
 */
const listPagi = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || 'nom';
    const order = req.query.order === 'desc' ? -1 : 1;

    const options = {
      page,
      limit,
      sort: { [sortBy]: order },
      lean: true,
      // Utilise 'populate' pour remplacer l'ID de l'auteur par les informations completes de l'auteur.
      // Le chemin 'autheur' correspond au champ dans le schema Livres.
      // Le select precise les champs de l'auteur a inclure ('nom' et 'prenom').
      populate: { path: 'autheur', select: 'nom prenom' },
      customLabels: {
        totalDocs: "total",
        docs: "Livres",
        limit: "limit",
        page: "page",
        nextPage: "next",
        prevPage: "prev",
        totalPages: "pages",
        pagingCounter: "serial",
        meta: "pagination",
      },
    };

    const result = await Livres.paginate({}, options);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const makeLink = (p) => `${baseUrl}?page=${p}&limit=${limit}`;

    result.pagination.links = {
      self: makeLink(result.pagination.page),
      next: result.pagination.next ? makeLink(result.pagination.next) : null,
      prev: result.pagination.prev ? makeLink(result.pagination.prev) : null,
      first: makeLink(1),
      last: makeLink(result.pagination.pages),
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Recupere un livre specifique par son ID.
 */
const listById = async (req, res) => {
  try {
    const _id = req.params._id;
    // Trouve le livre par son ID et peuple egalement les informations de l'auteur.
    const data = await Livres.findOne({ _id }).populate('autheur', 'nom prenom');
    if (!data) {
        return res.status(404).json({ message: "Livre non trouve" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Met a jour un livre existant.
 */
const update = async (req, res) => {
  try {
    const _id = req.params._id;
    const { error, value } = LivresValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((err) => err.message);
      return res.status(400).json({ errors: message });
    }

    // Trouve le livre et le met a jour avec les nouvelles donnees validees.
    const data = await Livres.findOneAndUpdate({ _id }, value, { new: true, runValidators: true });
    if (!data) {
        return res.status(404).json({ message: "Livre non trouve" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Supprime un livre par son ID.
 */
const deleteL = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await Livres.findOneAndDelete({ _id });
    if (!data) {
        return res.status(404).json({ message: "Livre non trouve" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Recupere tous les livres d'un auteur specifique.
 */
const listByAuteur = async (req, res) => {
  try {
    // Recupere l'ID de l'auteur depuis les parametres de l'URL.
    const auteurId = req.params._id;
    // Trouve tous les livres dont le champ 'autheur' correspond a l'ID fourni.
    const data = await Livres.find({ autheur: auteurId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Exportations ---
module.exports = {
  create,
  listPagi,
  listById,
  update,
  deleteL,
  listByAuteur,
};
