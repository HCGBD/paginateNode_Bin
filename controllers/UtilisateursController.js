const utilisateurModel = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');

const secret = 'ton_secret_pour_le_jwt'; // à garder secret et sécurisé en pratique

exports.register = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;
    const utilisateur = await utilisateurModel.creer(email, motdepasse);
    res.status(201).json({ message: 'Utilisateur créé', utilisateur: { id: utilisateur.id, email: utilisateur.email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;
    const utilisateur = await utilisateurModel.verifier(email, motdepasse);
    if (!utilisateur) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    // Générer le token JWT
    const token = jwt.sign({ id: utilisateur.id, email: utilisateur.email }, secret, { expiresIn: '1h' });
    res.json({ message: 'Connecté avec succès', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.profile = (req, res) => {
  // req.utilisateur est ajouté par le middleware auth
  const utilisateur = utilisateurModel.trouverParId(req.utilisateur.id);
  if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json({ id: utilisateur.id, email: utilisateur.email });
};
