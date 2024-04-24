const File = require('../models/file');
const multer = require('multer');
const fs = require('fs');

const folderName = 'uploads';

if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Le dossier ${folderName} a été créé avec succès.`);
}

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file');

// Contrôleur pour télécharger un fichier
exports.uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier' });
        } else if (err) {
            return res.status(500).json({ message: 'Une erreur est survenue lors du téléchargement du fichier' });
        }

        try {
            const { originalname } = req.file;
            const path = req.file.path;
            const userId = req.body.user;
            const gameId = req.body.game;

            const file = new File({
                name: originalname,
                path: path,
                user: userId,
                game: gameId
            });

            await file.save();
            res.status(201).json(file);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors du téléchargement du fichier' });
        }
    });
};

// Contrôleur pour récupérer un fichier par ID
exports.getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'Fichier non trouvé' });
        }
        res.download(file.path, file.name);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du fichier' });
    }
};

// Contrôleur pour récupérer tous les fichiers par ID de partie
exports.getAllFilesByGameId = async (req, res) => {
    try {
        const files = await File.find({ game: req.params.gameId });
        res.json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des fichiers' });
    }
};

// Contrôleur pour supprimer un fichier par ID
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'Fichier non trouvé' });
        }
        fs.unlinkSync(file.path); // Supprime le fichier du disque
        await file.remove(); // Supprime l'entrée de la base de données
        res.json({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du fichier' });
    }
};