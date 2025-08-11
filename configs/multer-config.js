const multer = require('multer');

// Configuration du stockage pour Multer
const storage = multer.diskStorage({
    // Destination de stockage des fichiers
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    // Renommage des fichiers pour eviter les conflits
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

// Filtre pour n'accepter que certains types de fichiers (ex: PDF)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accepter le fichier
    } else {
        cb(new Error('Type de fichier non supporte. Seuls les PDF sont autorises.'), false); // Rejeter le fichier
    }
};

// Initialisation de Multer avec la configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limite la taille du fichier a 5MB
    }
});

module.exports = upload;
