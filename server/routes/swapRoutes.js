import express from 'express';

const router = express.Router();

// @route   POST /api/swaps/request
router.post('/request', (req, res) => {
  res.send('Request a swap');
});

// @route   POST /api/swaps/redeem
router.post('/redeem', (req, res) => {
  res.send('Redeem using points');
});

// @route   GET /api/swaps/user/:id
router.get('/user/:id', (req, res) => {
  res.send(`Get swaps for user: ${req.params.id}`);
});

// @route   PATCH /api/swaps/:id/status
router.patch('/:id/status', (req, res) => {
  res.send(`Update swap status for ID: ${req.params.id}`);
});

export default router;
