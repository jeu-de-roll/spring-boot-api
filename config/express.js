const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterRoutes = require('../routes/characterRoutes');
const itemRoutes = require('../routes/itemRoutes');
const userRoutes = require('../routes/userRoutes');
const gameRoutes = require('../routes/gameRoutes');
const fileRoutes = require('../routes/fileRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/characters', characterRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/files', fileRoutes);

module.exports = app;
