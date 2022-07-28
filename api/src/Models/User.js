const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");

const User = conn.define(
  "user",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    ban_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    ban_purchase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    recovery: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue:
        "https://res.cloudinary.com/vombatidae/image/upload/v1658948667/default-avatar_cnydnd.jpg",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { User };
