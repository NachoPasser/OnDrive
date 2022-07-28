const { DataTypes } = require('sequelize');
const { conn } = require("../database/db");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Order = conn.define(
    'order', {
    id_order: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
        allowNull: false
    },
    payment_id: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    merchant_order_id: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    }
});

module.exports = { Order };