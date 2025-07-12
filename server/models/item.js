module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Item', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    size: DataTypes.STRING,
    condition: {
      type: DataTypes.ENUM('New', 'Lightly Used', 'Used'),
      allowNull: false
    },
    category: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('available', 'swapped'),
      defaultValue: 'available'
    }
  });
};
