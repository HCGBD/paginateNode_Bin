// --- Importations ---

// Importe le module Router d'Express pour creer des gestionnaires de routes modulaires.
const express  = require("express")
// Importe le controleur des auteurs, qui contient la logique metier pour chaque route.
const AutheursControllers = require("../controllers/AutheursControllers")

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
// NOTE : Cette route doit etre placee APRES les routes avec des parametres comme /:_id
// si elles partagent la meme methode HTTP, mais comme elles sont differentes (GET vs POST, etc.), l'ordre ici est correct.
// Cependant, la route `routes.get("/:_id", ...)` interceptera les requetes qui pourraient etre pour la pagination si un mot est mis a la place d'un id.
// C'est pourquoi il est generalement preferable de mettre les routes les plus specifiques en premier.
routes.get("/",AutheursControllers.listPagi)


// --- Exportation du Routeur ---

// Exporte le routeur configure pour etre utilise dans app.js.
module.exports = routes
