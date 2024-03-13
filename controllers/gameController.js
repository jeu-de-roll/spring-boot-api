const Game = require('../models/game');
const Stat = require('../models/stats');

exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json({ message: 'Partie créée avec succès', game });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId).populate('stats');
        if (!game) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }
        res.json(game);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

exports.createStat = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }

        const stat = new Stat(req.body);
        stat.game = game._id;
        await stat.save();

        game.stats.push(stat._id);
        await game.save();

        res.status(201).json({ message: 'Statistique créée avec succès', stat });
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