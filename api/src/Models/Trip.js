const { DataTypes, STRING } = require("sequelize");
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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
    destination: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    album: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
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
