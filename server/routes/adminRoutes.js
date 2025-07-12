import express from 'express';

const router = express.Router();

// @route   GET /api/admin/items/pending
router.get('/items/pending', (req, res) => {
  res.send('Get items pending approval');
});

// @route   PATCH /api/admin/items/:id/approve
router.patch('/items/:id/approve', (req, res) => {
  res.send(`Approve item ID: ${req.params.id}`);
});

// @route   DELETE /api/admin/items/:id
router.delete('/items/:id', (req, res) => {
  res.send(`Delete/reject item ID: ${req.params.id}`);
});

// @route   GET /api/admin/users
router.get('/users', (req, res) => {
  res.send('Get all users');
});

// @route   PATCH /api/admin/users/:id/block
router.patch('/users/:id/block', (req, res) => {
  res.send(`Block user ID: ${req.params.id}`);
});

// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', (req, res) => {
  res.send(`Delete user ID: ${req.params.id}`);
});

export default router;
