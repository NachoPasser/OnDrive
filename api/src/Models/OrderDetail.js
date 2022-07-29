const { DataTypes } = require('sequelize');
const { conn } = require("../database/db");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const OrderDetail = conn.define(
    'orderDetail', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

module.exports = { OrderDetail };