const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/:characterId', statsController.getStatsByCharacterId);
router.put('/:characterId', statsController.updateStatsByCharacterId);

module.exports = router;
