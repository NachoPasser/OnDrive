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
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finish_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    origin_img: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    destination_img: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Trip };
