const Joi = require('joi')
const joi = require('joi')

const AutheurValidator = joi.object({
    nom: Joi.string().required().min(3).messages({
        "string.base": "Le nom doit etre une chaine caractere",
        "any.required":"Le nom est obligatoire",
        "string.empty":"Le nom ne doit pas etre vide",
        "string.min":"Le nom doit avoir au moins 3 caractere"
    }),
    prenom: Joi.string().required().min(3).messages({
        "string.base": "Le prenom doit etre une chaine caractere",
        "any.required":"Le prenom est obligatoire",
        "string.empty":"Le prenom ne doit pas etre vide",
        "string.min":"Le prenom doit avoir au moins 3 caractere"
    }),
    dateNaiss:joi.string().isoDate().required().messages({
        "date.base":"Le format n'est pas une date",
        "date.empty":"La date ne doit pas etre vide",
        "any.required":"La Date est obligatoire",
        "string.isoDate": "La date doit être au format ISO (ex : 2024-08-05)."
    })
    
})

module.exports = AutheurValidator

