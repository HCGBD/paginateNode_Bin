// --- Importations des modules necessaires ---
const express = require('express');
const connectDb = require('./configs/db');

// Importations pour la securite et le logging
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Importe le middleware d'authentification
const authMiddleware = require('./middlewares/authMiddleware');

// Importe les differents routeurs
const AutheursRoutes  = require("./routes/AutheursRoutes");
const LivresRoutes = require("./routes/LivresRoutes");
const AuthRoutes = require("./routes/AuthRoutes");

// --- Configuration du Port ---
const PORT = process.env.PORT || 5000;

// --- Fonction Principale Asynchrone ---
const main  = async ()=>{
    const app  = express();
    
    // Etablit la connexion a la base de donnees MongoDB.
    connectDb();

    // --- Middlewares de Securite et de Logging ---

    // Securise les en-tetes HTTP
    app.use(helmet());

    // Active CORS pour toutes les origines. Pour plus de securite en production,
   
    // Exemple: app.use(cors({ origin: 'https://votre-site.com' }));
    app.use(cors());

    // Parse les corps de requete entrants en JSON
    app.use(express.json());

    // Log les requetes HTTP dans la console (en format 'dev')
    app.use(morgan('dev'));

    // Limiteur de requetes general pour toutes les routes
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limite chaque IP a 100 requetes par fenetre de 15 minutes
        standardHeaders: true, // Renvoie les informations de limite dans les en-tetes `RateLimit-*`
        legacyHeaders: false, // Desactive les en-tetes `X-RateLimit-*`
    });
    app.use(limiter);

    // Middleware pour servir les fichiers statiques du dossier 'uploads'
    app.use('/uploads', express.static('uploads'));

    // --- Definition des Routes ---

    // Applique un limiteur plus strict pour les routes d'authentification
    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 10, // Limite chaque IP a 10 requetes sur cette route
        message: 'Trop de tentatives de connexion, veuillez reessayer plus tard.'
    });
    app.use("/auth", authLimiter, AuthRoutes);

    // Les routes pour les auteurs et les livres sont protegees par le middleware d'authentification.
    app.use("/auteurs", authMiddleware, AutheursRoutes);
    app.use("/livres", authMiddleware, LivresRoutes);


    // --- Demarrage du Serveur ---
    app.listen(PORT, () => {
        console.log(`Server start in http://127.0.0.1:${PORT}`);
    });

}

// --- Lancement de l'application ---
main();
