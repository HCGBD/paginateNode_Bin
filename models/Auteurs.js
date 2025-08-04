const mongo = require('mongoose');
const { default: mongoose } = require('mongoose');

const auteur = mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    datePublication: {type: Date},
})

module.exports = mongoose.model('Auteur', auteur);