const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['string', 'number', 'boolean'],
        required: true
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    }
});

module.exports = mongoose.model('Stat', statSchema);
