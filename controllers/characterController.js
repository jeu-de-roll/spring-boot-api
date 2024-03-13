const Character = require('../models/character');
const Game = require('../models/game');

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

        const characterStats = req.body.stats.map((stat, index) => ({
            stat: stat.stat,
            value: stat.value
        }));

        const character = new Character({
            name: req.body.name,
            game: req.params.gameId,
            description: req.body.description,
            image: req.body.image,
            stats: characterStats
        });

        const newCharacter = await character.save();
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateStats = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }

        const updatedStats = req.body.stats.map(stat => ({
            idStat: stat.idStat,
            value: stat.value
        }));

        character.stats = updatedStats;
        await character.save();
        res.json(character);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

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
