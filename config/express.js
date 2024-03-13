const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const characterRoutes = require('../routes/characterRoutes');
const itemRoutes = require('../routes/itemRoutes');
const statsRoutes = require('../routes/statsRoutes');
const userRoutes = require('../routes/userRoutes');
const gameRoutes = require('../routes/gameRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/characters', characterRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

module.exports = app;
