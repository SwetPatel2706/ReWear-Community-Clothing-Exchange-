const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/swap.controller');

router.post('/', auth, controller.requestSwap);
router.put('/:id', auth, controller.updateSwapStatus);
router.get('/', auth, controller.getUserSwaps);

module.exports = router;
