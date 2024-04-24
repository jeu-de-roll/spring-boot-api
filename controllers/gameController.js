const Game = require('../models/game');
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const folderName = 'uploads';

if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Le dossier ${folderName} a été créé avec succès.`);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.createGame = async (req, res) => {
    try {
        console.log(req.body);
        upload.single('blankSheet')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: 'Erreur lors du téléchargement du fichier' });
            } else if (err) {
                return res.status(500).json({ message: 'Erreur serveur' });
            }

            const game = new Game({
                name: req.body.name,
                description: req.body.description,
                blankSheet: req.file ? req.file.path : '',
                master: req.body.master,
                players: req.body.players || []
            });

            const newGame = await game.save();
            res.status(201).json(newGame);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }
        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        if (!games) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }
        res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }
        await Game.deleteOne({ _id: req.params.gameId });
        res.json({ message: 'Partie supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.rollDice = (req, res) => {
    const expression = req.params.expression;

    const match = expression.match(/^(\d+)d(\d+)$/);

    if (!match) {
        return res.status(400).send({ error: "Expression invalide" });
    }

    const [, nbDices, nbFaces] = match;
    const resultats = [];

    for (let i = 0; i < nbDices; i++) {
        resultats.push(Math.floor(Math.random() * nbFaces) + 1);
    }

    res.send({ resultats });
}