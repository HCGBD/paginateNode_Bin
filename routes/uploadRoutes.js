const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // chemin vers le fichier précédent
const auth = require('../middlewares/UtilisateurMiddleware');

router.post('/upload', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier uploadé' });
    }
    // Le fichier est accessible via req.file après upload.
    // Tu peux retourner le chemin du fichier pour l’utiliser côté client.
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ message: 'Fichier uploadé avec succès', fileUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Seuls les fichiers images ou PDF sont autorisés') {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});



module.exports = router;