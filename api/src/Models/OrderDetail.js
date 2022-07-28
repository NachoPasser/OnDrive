const { DataTypes } = require('sequelize');
const { conn } = require("../database/db");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const OrderDetail = conn.define(
    'orderDetail', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = { OrderDetail };