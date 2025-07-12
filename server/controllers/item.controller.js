const db = require('../models');

const uploadItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name || !description || !req.file) {
      return res.status(400).json({ error: 'Name, description, and image are required.' });
    }

    const newItem = await db.Item.create({
      name,
      description,
      image: req.file.filename,
      userId
    });

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: 'Item upload failed' });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await db.Item.findAll({
      include: { model: db.User, attributes: ['id', 'username', 'email'] }
    });
    res.json(items);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.Item.findByPk(id, {
      include: { model: db.User, attributes: ['id', 'username'] }
    });

    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error("Get Item Error:", err);
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.Item.findByPk(id);

    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You can only update your own items.' });
    }

    const { name, description } = req.body;
    if (name) item.name = name;
    if (description) item.description = description;
    if (req.file) item.image = req.file.filename;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db.Item.findByPk(id);

    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own items.' });
    }

    await item.destroy();
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

module.exports = {
  uploadItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
