const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    sheetUrl: {
        type: String,
    }
});

module.exports = mongoose.model('Character', characterSchema);
