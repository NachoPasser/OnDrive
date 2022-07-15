//models
const { User } = require("../Models/User");
const { Driver } = require("../Models/Driver");
const { Trip } = require("../Models/Trip");
const { Admin } = require("../Models/Admin");
const { Car } = require("../Models/Car");
const { Fuel } = require("../Models/Fuel");

//relations:

//un driver pertenece a un usuario(es decir primero debe ser usuario para ser driver)
//un usario tiene un driver(no necesariamente).
Driver.belongsTo(User);
User.hasOne(Driver);

//un driver tiene muchos autos
//un auto pertenece a un driver
Driver.hasMany(Car);
Car.belongsTo(Driver);

//un driver tiene muchos viajes y un viaje pertenece a un driver
Driver.hasMany(Trip);
Trip.belongsTo(Driver);

//un usuario(pasajero) tiene muchos viajes
//y un viaje puede pertenecer a muchos pasajeros
User.hasMany(Trip);
Trip.belongsToMany(User, { through: "users_trips" });

//exporto todo los modelos por si se utilizan en otros archivos
module.exports = {
  models: { User, Driver, Trip, Admin, Fuel, Car },
};
