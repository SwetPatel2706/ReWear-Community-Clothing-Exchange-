// controllers/itemController.js
import { Item, User } from '../models/index.js';
import { getFileUrl, deleteFile } from '../utils/imageUpload.js';

// @desc    Create new item
// @route   POST /api/items
// @access  Private
export const createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    const userId = req.user.id;

    // Validation
    if (!title || !category || !type || !size || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, category, type, size, condition'
      });
    }

    // Handle uploaded images
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => getFileUrl(req, file.filename));
    }

    // Create item
    const item = await Item.create({
      user_id: userId,
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags || '',
      images: imageUrls,
      approved: false // Items need admin approval
    });

    // Fetch item with owner details
    const itemWithOwner = await Item.findByPk(item.id, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully. Pending admin approval.',
      data: itemWithOwner
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating item'
    });
  }
};

// @desc    Get all approved items
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Filters
    const { category, type, size, condition, search } = req.query;
    let whereClause = { approved: true, status: 'available' };

    // Apply filters
    if (category) whereClause.category = category;
    if (type) whereClause.type = type;
    if (size) whereClause.size = size;
    if (condition) whereClause.condition = condition;

    // Search functionality
    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
          { tags: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await Item.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name']
      }],
      order: [['created_at', 'DESC']],
      limit,
      offset
    });

    res.status(200).json({
      success: true,
      message: 'Items retrieved successfully',
      data: {
        items: rows,
        pagination: {
          current_page: page,
          total_pages: Math.ceil(count / limit),
          total_items: count,
          items_per_page: limit
        }
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching items'
    });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await Item.findByPk(itemId, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if item is approved (unless user is owner or admin)
    if (!item.approved && req.user) {
      const isOwner = req.user.id === item.user_id;
      const isAdmin = req.user.role === 'admin';
      
      if (!isOwner && !isAdmin) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }
    } else if (!item.approved && !req.user) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item retrieved successfully',
      data: item
    });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching item'
    });
  }
};

// @desc    Get items by user
// @route   GET /api/items/user/:userId
// @access  Private
export const getUserItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const requestingUserId = req.user.id;

    // Check if user is requesting their own items or is admin
    if (userId != requestingUserId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const items = await Item.findAll({
      where: { user_id: userId },
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name']
      }],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      message: 'User items retrieved successfully',
      data: items
    });
  } catch (error) {
    console.error('Get user items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user items'
    });
  }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;
    const { title, description, category, type, size, condition, tags } = req.body;

    // Find item
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check ownership
    if (item.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own items.'
      });
    }

    // Handle new images
    let imageUrls = item.images || [];
    if (req.files && req.files.length > 0) {
      // Delete old images if replacing
      if (req.body.replaceImages === 'true') {
        item.images.forEach(imageUrl => {
          const filename = imageUrl.split('/').pop();
          deleteFile(filename);
        });
        imageUrls = req.files.map(file => getFileUrl(req, file.filename));
      } else {
        // Add new images to existing ones
        const newImageUrls = req.files.map(file => getFileUrl(req, file.filename));
        imageUrls = [...imageUrls, ...newImageUrls];
      }
    }

    // Update item
    await item.update({
      title: title || item.title,
      description: description || item.description,
      category: category || item.category,
      type: type || item.type,
      size: size || item.size,
      condition: condition || item.condition,
      tags: tags || item.tags,
      images: imageUrls,
      approved: false // Re-approval needed after update
    });

    // Fetch updated item with owner
    const updatedItem = await Item.findByPk(itemId, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name']
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Item updated successfully. Pending admin approval.',
      data: updatedItem
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating item'
    });
  }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.id;

    // Find item
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check ownership
    if (item.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own items.'
      });
    }

    // Delete associated images
    if (item.images && item.images.length > 0) {
      item.images.forEach(imageUrl => {
        const filename = imageUrl.split('/').pop();
        deleteFile(filename);
      });
    }

    // Delete item
    await item.destroy();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting item'
    });
  }
};

// @desc    Update item status
// @route   PATCH /api/items/:id/status
// @access  Private
export const updateItemStatus = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { status } = req.body;
    const userId = req.user.id;

    // Validate status
    if (!['available', 'swapped', 'pending'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: available, swapped, or pending'
      });
    }

    // Find item
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check ownership
    if (item.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own items.'
      });
    }

    // Update status
    await item.update({ status });

    res.status(200).json({
      success: true,
      message: 'Item status updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Update item status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating item status'
    });
  }
};