const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('car', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  }, {
    timestamps: false
  });
};