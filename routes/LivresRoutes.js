// --- Importations ---
const express = require("express");
const LivresControllers = require("../controllers/LivresControllers");
const upload = require('../configs/multer-config'); // Importe la configuration de Multer

// --- Initialisation du Routeur ---
const routes = express.Router();

// --- Definition des Routes pour les Livres ---

// Route pour creer un nouveau livre.
// Le middleware 'upload.single("fichier")' intercepte un fichier du champ 'fichier'.
// POST /livres/
routes.post("/", upload.single('fichier'), LivresControllers.create);

// Route pour lister tous les livres avec pagination.
// GET /livres/
routes.get("/", LivresControllers.listPagi);

// Route pour recuperer un livre specifique par son ID.
// GET /livres/:_id
routes.get("/:_id", LivresControllers.listById);

// Route pour mettre a jour un livre specifique par son ID.
// PUT /livres/:_id
routes.put("/:_id", LivresControllers.update);

// Route pour supprimer un livre specifique par son ID.
// DELETE /livres/:_id
routes.delete("/:_id", LivresControllers.deleteL);


// --- Exportation du Routeur ---
module.exports = routes;
