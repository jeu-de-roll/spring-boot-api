const express = require('express');
const router = express.Router();
const gameMasterController = require('../controllers/gameMasterController');

router.post('/login', gameMasterController.login);
router.post('/register', gameMasterController.register);
router.post('/create-character', gameMasterController.createCharacter);
router.put('/update-character/:characterId', gameMasterController.updateCharacter);
router.delete('/delete-character/:characterId', gameMasterController.deleteCharacter);

module.exports = router;
