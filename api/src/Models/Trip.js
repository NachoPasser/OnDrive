const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('trip', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    start_date: {
        type: DataTypes.DATETIME,
        allowNull: false
    },
    finish_date: {
        type: DataTypes.DATETIME,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
  }, {
    timestamps: false
  });
};