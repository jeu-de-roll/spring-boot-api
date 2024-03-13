const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }
});

module.exports = mongoose.model('Item', itemSchema);
