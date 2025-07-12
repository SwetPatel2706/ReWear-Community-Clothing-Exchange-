import express from 'express';

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', (req, res) => {
  // TODO: register logic
  res.send('Register endpoint');
});

// @route   POST /api/auth/login
router.post('/login', (req, res) => {
  // TODO: login logic
  res.send('Login endpoint');
});

// @route   GET /api/auth/me
router.get('/me', (req, res) => {
  // TODO: get current user from token
  res.send('Get current user');
});

export default router;
