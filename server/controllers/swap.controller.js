const db = require('../models');

const requestSwap = async (req, res) => {
  const { itemId, ownerId } = req.body;
  const requesterId = req.user?.id;

  try {
    console.log('🔍 Request Swap', { itemId, ownerId, requesterId });

    if (!itemId || !ownerId || !requesterId) {
      return res.status(400).json({ error: 'Missing itemId, ownerId, or requesterId' });
    }

    if (ownerId === requesterId) {
      return res.status(400).json({ error: "You can't swap with your own item." });
    }

    const item = await db.Item.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const swap = await db.Swap.create({ itemId, ownerId, requesterId, status: 'pending' });
    res.status(201).json(swap);
  } catch (err) {
    console.error('❌ Swap Request Failed:', err);
    res.status(500).json({ error: 'Failed to request swap' });
  }
};

const updateSwapStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'accepted' or 'declined'

  try {
    const swap = await db.Swap.findByPk(id);
    if (!swap) return res.status(404).json({ error: 'Swap not found' });

    if (swap.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Only the owner can update swap status' });
    }

    swap.status = status;
    await swap.save();

    res.json({ message: `Swap ${status}` });
  } catch (err) {
    console.error('❌ Update Swap Failed:', err);
    res.status(500).json({ error: 'Failed to update swap' });
  }
};

const getUserSwaps = async (req, res) => {
  try {
    const swaps = await db.Swap.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { requesterId: req.user.id },
          { ownerId: req.user.id }
        ]
      },
      include: [db.Item, { model: db.User, as: 'owner', attributes: ['id', 'username'] }, { model: db.User, as: 'requester', attributes: ['id', 'username'] }]
    });

    res.json(swaps);
  } catch (err) {
    console.error('❌ Fetch Swaps Failed:', err);
    res.status(500).json({ error: 'Failed to fetch swaps' });
  }
};

module.exports = { requestSwap, updateSwapStatus, getUserSwaps };
