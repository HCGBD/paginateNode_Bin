const User = require('../models/User');
const UserValidator = require('../validators/UserValidator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Enregistre un nouvel utilisateur.
 */
const register = async (req, res) => {
    try {
        // Validation des donnees
        const { error, value } = UserValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map((err) => err.message);
            return res.status(400).json({ errors: message });
        }

        // Verifier si l'utilisateur existe deja
        const existingUser = await User.findOne({ username: value.username });
        if (existingUser) {
            return res.status(400).json({ message: "Ce nom d'utilisateur est deja pris." });
        }

        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt);

        // Creation de l'utilisateur
        const newUser = await User.create({
            username: value.username,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Utilisateur cree avec succes", userId: newUser._id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Connecte un utilisateur et retourne un token JWT.
 */
const login = async (req, res) => {
    try {
        // Validation des donnees
        const { error, value } = UserValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map((err) => err.message);
            return res.status(400).json({ errors: message });
        }

        // Verifier si l'utilisateur existe
        const user = await User.findOne({ username: value.username });
        if (!user) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }

        // Verifier le mot de passe
        const isMatch = await bcrypt.compare(value.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }

        // Creation du token JWT
        const payload = { id: user._id, username: user.username };
        // IMPORTANT: La cle secrete doit etre dans un fichier .env !
        const secret = process.env.JWT_SECRET || 'votre_cle_secrete_par_defaut';
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.status(200).json({ message: "Connexion reussie", token: token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
