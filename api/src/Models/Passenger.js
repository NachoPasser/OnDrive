const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('passenger', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    timestamps: false
  });
};