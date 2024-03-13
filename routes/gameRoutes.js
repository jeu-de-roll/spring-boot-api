const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/', gameController.createGame);
router.post('/:gameId/stats', gameController.createStat);
router.get('/rollDice/:expression', gameController.rollDice);
router.get('/:gameId', gameController.getGameById);
router.delete('/:gameId', gameController.deleteGame);

module.exports = router;
