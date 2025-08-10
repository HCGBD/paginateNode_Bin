const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/UtilisateursController');
const auth = require('../middlewares/UtilisateurMiddleware');

router.post('/register', utilisateurController.register);
router.post('/login', utilisateurController.login);
router.get('/profile', auth, utilisateurController.profile);

module.exports = router;
