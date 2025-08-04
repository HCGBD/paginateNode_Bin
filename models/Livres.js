const mongo = require("mongoose");
const auteur = require('./Auteurs');
const { default: mongoose } = require("mongoose");

const livre = mongoose.Schema({
    titre: {type: String, required: true},
    datePublicatin: {type: Date},
    page: {type: String, required: true},
    auteur: {type: Schema.Type.ObjectId, ref: 'Auteurs'}
});


module.exports = mongoose.model('Auteurs', auteur);