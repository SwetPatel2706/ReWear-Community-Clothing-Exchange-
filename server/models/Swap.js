// models/Swap.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Swap = sequelize.define('Swap', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  requester_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'items',
      key: 'id'
    }
  },
  offered_item_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // null for points redemption
    references: {
      model: 'items',
      key: 'id'
    }
  },
  method: {
    type: DataTypes.ENUM('swap', 'points'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  points_used: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'swaps',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Swap;