const bcrypt = require('bcrypt');

class Utilisateur {
  constructor() {
    this.utilisateurs = [];
  }

  async creer(email, motdepasse) {
    const checkUser = this.utilisateurs.find(u => u.email === email);
    if (checkUser) throw new Error('Utilisateur existe déjà');

    const hash = await bcrypt.hash(motdepasse, 10); // hacher le mot de passe
    const utilisateur = { id: this.utilisateurs.length + 1, email, motdepasse: hash };
    this.utilisateurs.push(utilisateur);
    return utilisateur;
  }

  async verifier(email, motdepasse) {
    const utilisateur = this.utilisateurs.find(u => u.email === email);
    if (!utilisateur) return null;
    const valid = await bcrypt.compare(motdepasse, utilisateur.motdepasse);
    return valid ? utilisateur : null;
  }

  trouverParId(id) {
    return this.utilisateurs.find(u => u.id === id);
  }
}

module.exports = new Utilisateur();
