// --- Importations ---
const mongo = require("mongoose");

// --- Definition du Schema pour l'Utilisateur ---
const userSchema = new mongo.Schema(
  {
    // Definit le champ 'username'.
    username: {
      type: String,
      required: true, // Le nom d'utilisateur est obligatoire.
      unique: true,   // Chaque nom d'utilisateur doit etre unique dans la collection.
      trim: true      // Supprime les espaces au debut et a la fin.
    },
    // Definit le champ 'password'.
    password: {
      type: String,
      required: true, // Le mot de passe est obligatoire.
    },
  },
  {
    // Ajoute automatiquement les champs createdAt et updatedAt.
    timestamps: true,
  }
);

// --- Creation et Exportation du Modele ---
module.exports = mongo.model("User", userSchema);
