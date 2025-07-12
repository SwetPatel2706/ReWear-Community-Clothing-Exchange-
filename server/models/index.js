// models/index.js
import { sequelize } from '../config/database.js';
import User from './User.js';
import Item from './Item.js';
import Swap from './Swap.js';

// Define associations
User.hasMany(Item, { 
  foreignKey: 'user_id', 
  as: 'items',
  onDelete: 'CASCADE'
});

Item.belongsTo(User, { 
  foreignKey: 'user_id', 
  as: 'owner'
});

User.hasMany(Swap, { 
  foreignKey: 'requester_id', 
  as: 'requestedSwaps',
  onDelete: 'CASCADE'
});

Swap.belongsTo(User, { 
  foreignKey: 'requester_id', 
  as: 'requester'
});

Item.hasMany(Swap, { 
  foreignKey: 'item_id', 
  as: 'swaps',
  onDelete: 'CASCADE'
});

Swap.belongsTo(Item, { 
  foreignKey: 'item_id', 
  as: 'requestedItem'
});

// For swap offers (when user offers their item in exchange)
Swap.belongsTo(Item, { 
  foreignKey: 'offered_item_id', 
  as: 'offeredItem'
});

Item.hasMany(Swap, { 
  foreignKey: 'offered_item_id', 
  as: 'offeredSwaps'
});

// Function to sync all models
const syncModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ All models synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
  }
};

export {
  sequelize,
  User,
  Item,
  Swap,
  syncModels
};