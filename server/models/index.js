const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/config').development;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Item = require('./item')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Item, { foreignKey: 'userId' });
db.Item.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;

db.Swap = require('./swap')(sequelize, DataTypes);

db.User.hasMany(db.Swap, { foreignKey: 'requesterId', as: 'RequestedSwaps' });
db.User.hasMany(db.Swap, { foreignKey: 'ownerId', as: 'ReceivedSwaps' });
db.Swap.belongsTo(db.User, { foreignKey: 'requesterId' });
db.Swap.belongsTo(db.User, { foreignKey: 'ownerId' });
db.Swap.belongsTo(db.Item, { foreignKey: 'itemId' });
db.Item.hasOne(db.Swap, { foreignKey: 'itemId' });
