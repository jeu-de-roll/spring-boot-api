const Character = require('../models/character');
const Game = require('../models/game');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const folderName = 'uploads';

if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Le dossier ${folderName} a été créé avec succès.`);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folderName);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.find({});
        res.json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json(character);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCharacterByName = async (req, res) => {
    try {
        const character = await Character.findOne({ name: req.params.name });
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json(character);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllCharactersByGame = async (req, res) => {
    try {
        const characters = await Character.find({ game: req.params.gameId });
        res.json(characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createCharacter = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        upload.single('sheetUrl')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier' });
            } else if (err) {
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            const character = new Character({
                name: req.body.name,
                level: req.body.level,
                hp: req.body.hp,
                inventory: req.body.inventory,
                game: req.params.gameId,
                sheetUrl: req.file ? req.file.path : '',
                type: req.body.type
            });

            const newCharacter = await character.save();
            res.status(201).json(newCharacter);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        Object.assign(character, req.body);
        await character.save();
        res.json(character);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findByIdAndDelete(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json({ message: 'Character deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};