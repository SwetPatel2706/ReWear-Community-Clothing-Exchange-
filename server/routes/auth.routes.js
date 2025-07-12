const authController = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
router.post('/login', authController.login);
