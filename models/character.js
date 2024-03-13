const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterStatSchema = new Schema({
    stat: {
        type: Schema.Types.ObjectId,
        ref: 'Stat',
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    hp: {
        type: Number,
        default: 100
    },
    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    stats: [characterStatSchema]
});

module.exports = mongoose.model('Character', characterSchema);
