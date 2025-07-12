// models/Item.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Shirt', 'Pants', 'Dress', 'Jacket', 'Shoes', 'Accessories', 'Other']]
    }
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Men', 'Women', 'Kids', 'Unisex']]
    }
  },
  size: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size']]
    }
  },
  condition: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['New', 'Like New', 'Good', 'Fair', 'Poor']]
    }
  },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const tags = this.getDataValue('tags');
      return tags ? tags.split(',').map(tag => tag.trim()) : [];
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('tags', value.join(','));
      } else {
        this.setDataValue('tags', value);
      }
    }
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('available', 'swapped', 'pending'),
    defaultValue: 'available'
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  points_value: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Item;