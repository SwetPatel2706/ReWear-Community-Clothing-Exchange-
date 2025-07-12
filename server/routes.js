import express from 'express';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import swapRoutes from './routes/swapRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/swaps', swapRoutes);
router.use('/admin', adminRoutes);

export default router;
