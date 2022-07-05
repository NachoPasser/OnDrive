const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    license: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    driving_permit: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
  }, {
    timestamps: false
  });
};