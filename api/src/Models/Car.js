const { DataTypes } = require("sequelize");
const {
  validator_string,
  validator_emptyString,
  validator_validLength,
  validator_validRange,
} = require("./Validators/validators");

module.exports = (sequelize) => {
  sequelize.define(
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
          isAllowedLength: (val) =>
            validator_validLength(val, "car", "type", 25),
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
    },
    {
      timestamps: false,
    }
  );
};
