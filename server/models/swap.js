module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Swap', {
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'declined'),
      defaultValue: 'pending'
    }
  });
};
