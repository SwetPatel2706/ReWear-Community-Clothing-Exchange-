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
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
db.User = require('./user')(sequelize, DataTypes);
db.Item = require('./item')(sequelize, DataTypes);
db.Swap = require('./swap')(sequelize, DataTypes);
// db.Point = require('./point')(sequelize, DataTypes); // Optional

// Define relationships
db.User.hasMany(db.Item);
db.Item.belongsTo(db.User);

db.User.hasMany(db.Swap, { as: 'RequestedSwaps', foreignKey: 'requesterId' });
db.User.hasMany(db.Swap, { as: 'ReceivedSwaps', foreignKey: 'ownerId' });
db.Item.hasOne(db.Swap);
db.Swap.belongsTo(db.Item);

// If you use Point model later, uncomment these:
// db.User.hasMany(db.Point);
// db.Point.belongsTo(db.User);

module.exports = db;
