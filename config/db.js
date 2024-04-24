const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rpg-api', {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;