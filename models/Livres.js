const mongo = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const livreSchema = mongo.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Le champ 'auteur' stocke une reference a un document de la collection 'Auteurs'.
    // 'type: mongo.Schema.Types.ObjectId' indique que nous stockons un ID MongoDB.
    // 'ref: "Auteurs"' dit a Mongoose que cet ID correspond a un document du modele 'Auteurs'.
    // C'est essentiel pour pouvoir utiliser la fonction 'populate' plus tard.
    autheur: {
      type: mongo.Schema.Types.ObjectId,
      ref: "Auteurs", // Doit correspondre au nom du modele exporte pour les auteurs
      required: true,
    },
    // Ajoute un champ pour stocker le chemin du fichier du livre.
    fichierPath: {
        type: String,
        required: false // Ce champ n'est pas obligatoire
    }
  },
  {
    // Ajoute automatiquement les champs createdAt et updatedAt
    timestamps: true,
  }
);

// Applique le plugin de pagination au schema des livres
livreSchema.plugin(mongoosePaginate);

module.exports = mongo.model("Livres",livreSchema)



