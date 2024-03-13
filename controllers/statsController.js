const Stat = require('../models/stats');
const Game = require('../models/game');
const Character = require('../models/character');

exports.createStat = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) return res.status(404).json({ error: 'Game not found' });

        const newStat = new Stat({
            name: req.body.name,
            type: req.body.type,
            game: game._id
        });

        const savedStat = await newStat.save();
        game.stats.push(savedStat._id);
        await game.save();

        res.status(201).json(savedStat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) return res.status(404).json({ error: 'Game not found' });

        const stats = await Stat.find({ game: game._id });
        res.status(200).json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStat = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.statId);
        if (!stat) return res.status(404).json({ error: 'Stat not found' });

        stat.name = req.body.name || stat.name;
        stat.type = req.body.type || stat.type;

        const updatedStat = await stat.save();
        res.status(200).json(updatedStat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteStat = async (req, res) => {
    try {
        const stat = await Stat.findById(req.params.statId);
        if (!stat) return res.status(404).json({ error: 'Stat not found' });

        await Character.updateMany(
            { 'stats.stat': stat._id },
            { $pull: { stats: { stat: stat._id } } }
        );

        await Game.findByIdAndUpdate(stat.game, { $pull: { stats: stat._id } });
        await Stat.findByIdAndDelete(stat._id);

        res.status(204).json(null);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
