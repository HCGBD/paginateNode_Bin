const { timeStamp } = require("console");
const mongo = require("mongoose");


const autheurSchema = mongo.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    dateNaiss: {
      type: Date,
      required: true,
    },
  },
  {
    timeStamp,
  }
);

module.exports = mongo.model("Auteurs",autheurSchema)
