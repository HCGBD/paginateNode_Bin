
const express = require('express');
const AuthControllers = require('../controllers/AuthControllers');

const routes = express.Router();

// Route pour l'enregistrement d'un nouvel utilisateur
// POST /auth/register
routes.post('/register', AuthControllers.register);

// Route pour la connexion d'un utilisateur
// POST /auth/login
routes.post('/login', AuthControllers.login);

module.exports = routes;
