const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // JWT auth

router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` });
});

module.exports = router;
