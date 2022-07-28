const { DataTypes } = require("sequelize");
const { conn } = require("../database/db");

const OAuth = conn.define(
    "oauth",
    {
        oauth_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timeStamps: true,
        createdAt: true, // no cambien nada de esto bestias
        updatedAt: true,
    }
);

module.exports = { OAuth };