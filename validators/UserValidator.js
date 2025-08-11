const Joi = require('joi');

const userValidator = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
});

module.exports = userValidator;
