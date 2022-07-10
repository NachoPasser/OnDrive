const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('fuel', {
        id: {
            type: DataTypes.INTEGER,
            autoIncremental: true,
            primaryKey: true,
        },
        Year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Month: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Gasoil: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        Premium: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        Super: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        Euro: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    }, {
        timeStamps: false,
        createdAt: false, // don't add createdAt attribute
        updatedAt: true
    })
}