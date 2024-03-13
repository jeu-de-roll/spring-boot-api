const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    master: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    stats: [{
        type: Schema.Types.ObjectId,
        ref: 'Stat'
    }]
});

module.exports = mongoose.model('Game', gameSchema);
