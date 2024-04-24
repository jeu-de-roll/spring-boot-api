const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getAllGames);
router.post('/', gameController.createGame);
router.get('/rollDice/:expression', gameController.rollDice);
router.get('/:gameId', gameController.getGameById);
router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
