const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/:id', characterController.getCharacterById);
router.get('/name/:name', characterController.getCharacterByName);
router.get('/all/:gameId', characterController.getAllCharactersByGame);
router.post('/:gameId', characterController.createCharacter);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;
