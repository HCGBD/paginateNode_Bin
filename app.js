// --- Importations des modules necessaires ---

// Importe le framework Express pour creer et gerer le serveur.
const express = require('express') 
// Importe la fonction de connexion a la base de donnees depuis notre fichier de configuration.
const connectDb = require('./configs/db') 
// Importe les routes dediees aux auteurs.
const AutheursRoutes  = require("./routes/AutheursRoutes")
const LivresRoutes = require('./routes/LivresRoutes') 

// --- Configuration du Port ---

// Definit le port sur lequel le serveur ecoutera.
// Il utilise le port defini dans les variables d'environnement (process.env.PORT)
// ou le port 5000 si aucune variable d'environnement n'est definie.
const PORT = process.env.PORT || 5000

// --- Fonction Principale Asynchrone ---

// La fonction 'main' est le point de depart de notre application.
// Elle est declaree 'async' pour pouvoir utiliser 'await' si necessaire.
const main  = async ()=>{
    // Cree une instance de l'application Express.
    const app  = express()
    
    // Etablit la connexion a la base de donnees MongoDB.
    connectDb()

    // --- Middlewares ---

    // Ajoute le middleware express.json().
    // Ce middleware analyse les corps des requetes entrantes au format JSON.
    // Il permet d'acceder facilement aux donnees envoyees par le client via `req.body`.
    app.use(express.json())

    // --- Definition des Routes ---

    // Monte les routes des auteurs sur le chemin de base "/auteurs".
    // Toutes les requetes commencant par "/auteurs" (ex: /auteurs, /auteurs/123)
    // seront gerees par le routeur 'AutheursRoutes'.
    app.use("/auteurs",AutheursRoutes)
    app.use("/livres", LivresRoutes)


    // --- Demarrage du Serveur ---

    // Demarre le serveur et le fait ecouter les connexions sur le port defini.
    app.listen(PORT, () => {
        // Affiche un message dans la console pour confirmer que le serveur a demarre correctement.
        console.log(`Server start in http://127.0.0.1:${PORT}`);
        
    })

}

// --- Lancement de l'application ---

// Appelle la fonction principale pour demarrer tout le processus.
main()
