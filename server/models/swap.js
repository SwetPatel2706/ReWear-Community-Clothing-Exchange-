module.exports = (sequelize, DataTypes) => {
  const Swap = sequelize.define('Swap', {
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'declined'),
      defaultValue: 'pending'
    }
  });
  return Swap;
};