const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('passenger', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    dni: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    address: {
        type: DataTypes.STRING(75),
        allowNull: false
    }
  }, {
    timestamps: false
  });
};