const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");

const Car = conn.define(
  "car",
  {
    car_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    license_plate: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    fuel: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Car };
