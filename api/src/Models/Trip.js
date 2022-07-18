const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");

const Trip = conn.define(
  "trip",
  {
    trip_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finish_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    distance: {
      type: DataTypes.DECIMAL(5),
      allowNull: false,
    },
    onCourse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Trip };
