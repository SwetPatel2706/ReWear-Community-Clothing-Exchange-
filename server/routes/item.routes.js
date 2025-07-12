const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const itemController = require('../controllers/item.controller');

// Public routes
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);

// Protected routes
router.post('/', auth, upload.single('image'), itemController.uploadItem);
router.put('/:id', auth, upload.single('image'), itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;
