const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");
const {
  validator_string,
  validator_emptyString,
  validator_validLength,
  validator_validRange,
} = require("./utils/validators");

const Car = conn.define(
  "car",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isString: (val) => validator_string(val, "car", "type"),
        isEmptyString: (val) => validator_emptyString(val, "car", "type"),
        isAllowedLength: (val) => validator_validLength(val, "car", "type", 25),
      },
    },
    model: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        isString: (val) => validator_string(val, "car", "model"),
        isEmptyString: (val) => validator_emptyString(val, "car", "model"),
        isAllowedLength: (val) =>
          validator_validLength(val, "car", "model", 25),
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "car year must be a integer",
        },
        isValidRange: (val) => validator_validRange(val, "car", "year"),
      },
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "car color is invalid, only letters",
        },
        isEmptyString: (val) => validator_emptyString(val, "car", "color"),
        isAllowedLength: (val) =>
          validator_validLength(val, "car", "model", 20),
      },
    },
    license_plate: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isEmptyString: (val) =>
          validator_emptyString(val, "car", "license plate"),
        isAllowedLength: (val) =>
          validator_validLength(val, "car", "license plate", 20),
      },
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
