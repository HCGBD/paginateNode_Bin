// --- Importations ---

// Importe la bibliotheque Mongoose.
const mongo = require("mongoose");
// Importe le plugin de pagination pour Mongoose, qui ajoute la fonctionnalite .paginate() aux modeles.
const mongoosePaginate = require('mongoose-paginate-v2');

// --- Definition du Schema ---

// Un schema Mongoose definit la structure des documents au sein d'une collection MongoDB.
const autheurSchema = mongo.Schema(
  {
    // Definit le champ 'nom'.
    nom: {
      type: String, // Le type de donnee est une chaine de caracteres.
      required: true, // Ce champ est obligatoire.
    },
    // Definit le champ 'prenom'.
    prenom: {
      type: String,
      required: true,
    },
    // Definit le champ 'dateNaiss' (date de naissance).
    dateNaiss: {
      type: Date, // Le type de donnee est une date.
      required: true,
    },
  },
  {
    // Options du schema.
    // `timestamps: true` demande a Mongoose d'ajouter automatiquement deux champs a chaque document :
    // `createdAt` (la date de creation du document)
    // `updatedAt` (la date de la derniere mise a jour du document)
    timestamps: true,
  }
);

// --- Ajout de Plugins ---

// Applique le plugin de pagination au schema.
// C'est cette ligne qui "active" la methode `Auteurs.paginate()` que nous utilisons dans le controleur.
autheurSchema.plugin(mongoosePaginate);

// --- Creation et Exportation du Modele ---

// Cree un modele Mongoose nomme "Auteurs" a partir du schema `autheurSchema`.
// Un modele est une classe avec laquelle nous construisons des documents. Dans ce cas, chaque document sera un auteur avec les champs definis ci-dessus.
// Mongoose va automatiquement chercher ou creer une collection nommee "auteurs" (au pluriel et en minuscules) dans la base de donnees.
module.exports = mongo.model("Auteurs",autheurSchema)