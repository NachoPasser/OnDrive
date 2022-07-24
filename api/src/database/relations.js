//models
const { User } = require("../Models/User");
const { Driver } = require("../Models/Driver");
const { Trip } = require("../Models/Trip");
const { Admin } = require("../Models/Admin");
const { Car } = require("../Models/Car");
const { Fuel } = require("../Models/Fuel");

//MODELOS DE MERCADOPAGO
const { Order } = require("../Models/Order");
const { OrderDetail } = require("../Models/OrderDetail");

const { Review } = require('../Models/Review')

const { DataTypes } = require("sequelize");

//relations:

//un driver pertenece a un usuario(es decir primero debe ser usuario para ser driver)
//un usario tiene un driver(no necesariamente).
Driver.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Driver, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

//una review pertenece a un viaje (es decir primero debe existir un viaje para que haya una review)
//un viaje tiene muchas reviews
Trip.hasMany(Review, { foreignKey: 'trip_id'})
Review.belongsTo(Trip, { foreignKey: 'trip_id'})

//una review pertenece a un usuario (es decir primero debe existir un usuario para que haya una review)
//un usuario tiene muchas reviews
User.hasMany(Review, {foreignKey: 'user_id'})
Review.belongsTo(User, {foreignKey: 'user_id'})

//un driver tiene muchos autos
//un auto pertenece a un driver
Driver.hasMany(Car, { foreignKey: "driver_id" });
Car.belongsTo(Driver, { foreignKey: "driver_id" });

//un driver tiene muchos viajes y un viaje pertenece a un driver
Driver.hasMany(Trip, { foreignKey: "driver_id" });
Trip.belongsTo(Driver, { foreignKey: "driver_id" });

//un usuario(pasajero) tiene muchos viajes
//y un viaje puede pertenecer a muchos pasajeros
User.belongsToMany(Trip, {
  through: "users_trips",
  foreignKey: "user_id",
  timestamps: false,
});
Trip.belongsToMany(User, {
  through: "users_trips",
  foreignKey: "trip_id",
  timestamps: false,
});

//RELACIONES PARA MODELOS DE MERCADOPAGO:

//un usuario(pasajero) puede tener varias ordenes(compras)
User.hasMany(Order)
//pero cada orden solo puede pertenecer a un usuario
Order.belongsTo(User)

//una orden puede tener varios detalle de compra
Order.hasMany(OrderDetail)
//un viaje tiene varios detalles de compra
Trip.hasMany(OrderDetail)
//y un detalle pertenece a un viaje
OrderDetail.belongsTo(Trip)

//exporto todo los modelos por si se utilizan en otros archivos
module.exports = {
  models: { User, Driver, Trip, Admin, Fuel, Car, Order, OrderDetail },
};
