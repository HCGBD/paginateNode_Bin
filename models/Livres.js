const { timeStamp } = require("console");
const mongo = require("mongoose");
const { type } = require("os");
const { ref } = require("process");

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
    autheur: {
      type: mongo.Schema.Types.ObjectId,
      ref: "Auteurs",
      required: true,
    },
  },
  {
    timeStamp,
  }
);


module.exports = mongo.model("Livres",livreSchema)


