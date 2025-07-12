const auth = require('../middleware/authMiddleware');

router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` });
});
