// --- Importations ---

// Importe Mongoose, une bibliotheque qui facilite l'interaction avec MongoDB.
const mongo = require("mongoose")
// Importe et configure le module 'dotenv'.
// Cela permet de charger les variables d'environnement a partir d'un fichier .env dans process.env.
require("dotenv").config()

// --- Fonction de Connexion ---

// Definit une fonction asynchrone pour se connecter a la base de donnees.
const connectDb = async ()=>{
    try {
        // Tente de se connecter a la base de donnees MongoDB.
        // L'URI de connexion est recuperee depuis les variables d'environnement (process.env.DB_URI).
        // C'est une bonne pratique pour ne pas ecrire d'informations sensibles directement dans le code.
        mongo.connect("mongodb://localhost:27017/gestionBibliotheque");

        // Affiche un message de succes dans la console si la connexion est etablie.
        console.log("Connect DB success ");

    } catch (error) {
        // Si une erreur se produit pendant la tentative de connexion...
        // Affiche l'erreur dans la console pour le debogage.
        console.log("errror :", error);

    }
}

// --- Exportation ---

// Exporte la fonction connectDb pour qu'elle puisse etre utilisee dans d'autres fichiers (comme app.js).
module.exports = connectDb
