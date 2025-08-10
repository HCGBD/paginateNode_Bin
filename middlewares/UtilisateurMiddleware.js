const jwt = require('jsonwebtoken');
const secret = 'ton_secret_pour_le_jwt';

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "Jeton manquant" });

  const token = authHeader.split(' ')[1]; // Authorization: Bearer <token>
  if (!token) return res.status(401).json({ message: "Jeton manquant" });

  jwt.verify(token, secret, (err, utilisateur) => {
    if (err) return res.status(403).json({ message: "Jeton invalide" });
    req.utilisateur = utilisateur; // ajoute les infos utilisateur à la requête
    next();
  });
}

module.exports = auth;
