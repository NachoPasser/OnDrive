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
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.points / this.votes;
      },
      set(newPoints) {
        if (typeof newPoints !== "number")
          throw new Error("El rating debe ser un numero");
        if (newPoints < 0 || newPoints > 5)
          throw new Error("El rating debe ser un numero entre 0 y 5");
        this.votes += 1;
        this.points += newPoints;
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Driver };
