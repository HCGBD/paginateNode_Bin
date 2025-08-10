const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    // Génère un nom unique avec timestamp et extension d’origine
    const uniqueName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// Filtrer les fichiers acceptés (images + pdfs)
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers images ou PDF sont autorisés'));
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
