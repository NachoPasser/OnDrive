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
    car_insurance: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },

    ban_publish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
  }
);

module.exports = { Driver };
