// --- Importations ---

// Importe la bibliotheque Joi pour la validation de schemas.
const Joi = require('joi');

// --- Schema de Validation pour les Livres ---

// Definit un schema de validation pour les objets 'livre'.
const livreValidator = Joi.object({
    // Le champ 'nom' est une chaine de caracteres (string) et est obligatoire (required).
    nom: Joi.string().required(),

    // Le champ 'description' est une chaine de caracteres et est obligatoire.
    description: Joi.string().required(),

    // Le champ 'autheur' est une chaine de caracteres, obligatoire.
    // Il doit correspondre a une expression reguliere qui valide le format d'un ObjectId de MongoDB.
    // Un ObjectId est compose de 24 caracteres hexadecimaux.
    autheur: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
});

// --- Exportation ---

// Exporte le schema de validation pour qu'il puisse etre utilise dans d'autres parties de l'application (par exemple, dans le controleur des livres).
module.exports = livreValidator;
