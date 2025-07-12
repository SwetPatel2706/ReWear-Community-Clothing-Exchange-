// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token or user not found.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid token.' 
    });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

// Middleware to check if user owns the resource
const checkOwnership = (resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const userId = req.user.id;

      // For items, check if user owns the item
      if (req.baseUrl.includes('items')) {
        const { Item } = await import('../models/index.js');
        const item = await Item.findByPk(resourceId);
        
        if (!item) {
          return res.status(404).json({ 
            success: false, 
            message: 'Item not found.' 
          });
        }

        if (item.user_id !== userId && req.user.role !== 'admin') {
          return res.status(403).json({ 
            success: false, 
            message: 'Access denied. You can only modify your own items.' 
          });
        }
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error during ownership verification.' 
      });
    }
  };
};

export {
  authenticateToken,
  requireAdmin,
  checkOwnership
};