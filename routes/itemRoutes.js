const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/all/:gameId', itemController.getAllItemsFromGame);
router.get('/:id', itemController.getItemById);
router.post('/:gameId', itemController.createItemInGame);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
