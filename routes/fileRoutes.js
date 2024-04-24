const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadFile);
router.get('/:id', fileController.getFileById);
router.get('/all/:gameId', fileController.getAllFilesByGameId);
router.delete('/:id', fileController.deleteFile);

module.exports = router;