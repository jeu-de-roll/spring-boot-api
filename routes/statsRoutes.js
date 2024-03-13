const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.post('/games/:gameId/stats', statsController.createStat);
router.get('/games/:gameId/stats', statsController.getStats);
router.put('/stats/:statId', statsController.updateStat);
router.delete('/stats/:statId', statsController.deleteStat);

module.exports = router;
