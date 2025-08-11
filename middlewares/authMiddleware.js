const jwt = require('jsonwebtoken');

/**
 * Middleware pour verifier le token JWT.
 */
const authMiddleware = (req, res, next) => {
    // Recherche du token dans l'en-tete Authorization
    const authHeader = req.headers['authorization'];

    // Le format attendu est "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acces non autorise, token manquant ou mal forme.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verification du token
        const secret = process.env.JWT_SECRET || 'votre_cle_secrete_par_defaut';
        const decoded = jwt.verify(token, secret);

        // Ajout des informations de l'utilisateur a l'objet de la requete
        req.user = decoded;

        // Passe a la suite du traitement de la requete
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

module.exports = authMiddleware;
