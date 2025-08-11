// --- Importations ---

// Importe le module Router d'Express pour creer des gestionnaires de routes modulaires.
const express  = require("express")
// Importe le controleur des auteurs, qui contient la logique metier pour chaque route.
const AutheursControllers = require("../controllers/AutheursControllers")
// Importe le controleur des livres pour la nouvelle fonctionnalite.
const LivresControllers = require("../controllers/LivresControllers");

// --- Initialisation du Routeur ---

// Cree une nouvelle instance de Router.
const routes =  express.Router();

// --- Definition des Routes pour les Auteurs ---

// Chaque route est associee a une methode HTTP (GET, POST, PUT, DELETE)
// et a une fonction du controleur qui sera executee lorsque la route est appelee.

// Route pour creer un nouvel auteur.
// Methode HTTP : POST
// URL : /auteurs/
// Controleur : AutheursControllers.create
routes.post("/",AutheursControllers.create)

// Route pour lister tous les livres d'un auteur specifique.
// Methode HTTP : GET
// URL : /auteurs/:_id/livres
// NOTE : Cette route est placee avant /:_id pour s'assurer qu'elle est bien identifiee.
routes.get("/:_id/livres", LivresControllers.listByAuteur);

// Route pour recuperer un auteur specifique par son ID.
// Methode HTTP : GET
// URL : /auteurs/:_id (ex: /auteurs/60d21b4667d0d8992e610c85)
// Controleur : AutheursControllers.listById
routes.get("/:_id",AutheursControllers.listById)

// Route pour mettre a jour un auteur specifique par son ID.
// Methode HTTP : PUT
// URL : /auteurs/:_id
// Controleur : AutheursControllers.update
routes.put("/:_id",AutheursControllers.update)

// Route pour supprimer un auteur specifique par son ID.
// Methode HTTP : DELETE
// URL : /auteurs/:_id
// Controleur : AutheursControllers.deleteA
routes.delete("/:_id",AutheursControllers.deleteA)

// Route pour lister tous les auteurs avec pagination.
// Methode HTTP : GET
// URL : /auteurs/ (ex: /auteurs?page=1&limit=10)
// Controleur : AutheursControllers.listPagi
routes.get("/",AutheursControllers.listPagi)


// --- Exportation du Routeur ---

// Exporte le routeur configure pour etre utilise dans app.js.
module.exports = routes
