const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");

const Driver = conn.define(
  "driver",
  {
    driver_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    license: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    driving_permit: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Driver };
