const { DataTypes } = require('sequelize');
const { conn } = require("../database/db");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const OrderDetail = conn.define(
    'orderDetail', {
    orderDetail_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    origin: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    destiny: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_order: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT
    },
    external_reference: {
        type: DataTypes.TEXT
    }
});

module.exports = { OrderDetail };