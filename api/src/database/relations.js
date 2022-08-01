//models
const { User } = require("../Models/User");
const { Driver } = require("../Models/Driver");
const { Trip } = require("../Models/Trip");
const { Admin } = require("../Models/Admin");
const { Car } = require("../Models/Car");
const { Fuel } = require("../Models/Fuel");
const { Review } = require('../Models/Review');
//MODELOS DE MERCADOPAGO
const { Order } = require("../Models/Order");
const { OrderDetail } = require("../Models/OrderDetail");
const { OAuth } = require('../Models/OAuth.js');
const { Capacity } = require('../Models/Capacity');
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

Car.hasMany(Trip, { foreignKey: 'car_id' })
Trip.belongsTo(Car, { foreignKey: 'car_id' })


//

//una review pertenece a un viaje (es decir primero debe existir un viaje para que haya una review)
//un viaje tiene muchas reviews
Trip.hasMany(Review, { foreignKey: 'trip_id' })
Review.belongsTo(Trip, { foreignKey: 'trip_id' })

//una capacidad usa a un viaje (es decir primero debe existir un viaje para que tenga capacidad)
//un viaje va alternando su capacidad
Trip.hasMany(Capacity, { foreignKey: 'trip_id' })
Capacity.belongsTo(Trip, { foreignKey: 'trip_id' })

//un usuario ocupa cierta capacidad en distintos viajes
//La capacidad de un usuario le pertenece a ese usuario
User.hasMany(Capacity, { foreignKey: 'user_id' })
Capacity.belongsTo(User, { foreignKey: 'user_id' })

//una review pertenece a un usuario (es decir primero debe existir un usuario para que haya una review)
//un usuario tiene muchas reviews
User.hasMany(Review, { foreignKey: 'user_id' })
Review.belongsTo(User, { foreignKey: 'user_id' })

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
//un oauth pertenece a un driver (primero ser driver, luego tener o auth)
//un driver tiene un o oauth (no te obligamos a autenticar, puede que en el momento de hacerte driver no tengas mercadopago y más adelante sí)
OAuth.belongsTo(Driver, { foreignKey: 'driver_id' });
Driver.hasOne(OAuth, {
  foreignKey: {
    name: 'driver_id',
    allowNull: false,
    type: DataTypes.UUID,
  },
});
//un usuario(pasajero) puede tener varias ordenes(compras)
User.hasMany(Order, { foreignKey: 'user_id' })
//pero cada orden solo puede pertenecer a un usuario
Order.belongsTo(User, { foreignKey: 'user_id' })

//una orden puede tener varios detalle de compra
// Order.hasMany(OrderDetail, { foreignKey: 'id_order' })
// //un detalle pertenece a una orden específica
// OrderDetail.belongsTo(Order, {
//   foreignKey: {
//     name: 'id_order',
//     allowNull: true,
//     type: DataTypes.TEXT,
//   }

// })
// //un viaje tiene varios detalles de compra
// Trip.hasMany(OrderDetail, { foreignKey: 'trip_id' })
// //y un detalle pertenece a un viaje
// OrderDetail.belongsTo(Trip, { foreignKey: 'trip_id' })

//exporto todo los modelos por si se utilizan en otros archivos
module.exports = {
  models: { User, Driver, Trip, Admin, Fuel, Car, Review, OAuth, Order, OrderDetail, Capacity },
};
