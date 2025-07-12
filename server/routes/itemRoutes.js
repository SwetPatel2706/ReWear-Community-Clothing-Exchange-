import express from 'express';

const router = express.Router();

// @route   POST /api/items
router.post('/', (req, res) => {
  res.send('Add new item');
});

// @route   GET /api/items
router.get('/', (req, res) => {
  res.send('Get all approved items');
});

// @route   GET /api/items/:id
router.get('/:id', (req, res) => {
  res.send(`Get item detail for ID: ${req.params.id}`);
});

// @route   GET /api/items/user/:userId
router.get('/user/:userId', (req, res) => {
  res.send(`Get items by user: ${req.params.userId}`);
});

// @route   PATCH /api/items/:id/status
router.patch('/:id/status', (req, res) => {
  res.send(`Update item status for ID: ${req.params.id}`);
});

export default router;
