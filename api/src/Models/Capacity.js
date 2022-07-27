const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");

const Capacity = conn.define(
  "capacity",
  {
    capacity_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    number: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Capacity };
