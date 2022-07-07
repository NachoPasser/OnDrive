require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//Para correr el Back, fue necesario colocar los Model:
const ModelUser = require("./Models/User");
const ModelCar = require("./Models/Car");
const ModelTrip = require("./Models/Trip");
const ModelComment = require("./Models/Comment");
const ModelDriver = require("./Models/Driver");
const ModelPassenger = require("./Models/Passenger");
const ModelRoles = require("./Models/Role");

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ondrive`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// SECCIÓN COMENTADA
// const basename = path.basename(__filename);

// const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/Models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/Models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);
// FIN SECCIÓN COMENTADA

// También necesario para correr el Back:
ModelUser(sequelize);
ModelCar(sequelize);
ModelTrip(sequelize);
ModelComment(sequelize);
ModelDriver(sequelize);
ModelPassenger(sequelize);
ModelRoles(sequelize);

const { user, car, trip, comment, driver, passenger, roles } = sequelize.models;
// Relaciones:


User.belongsToMany(Roles, { through: "users_roles", timestamps: false });
Roles.belongsToMany(User, { through: "users_roles", timestamps: false });

Passenger.belongsToMany(Trip, { through: "passengers_trips", timestamps: false });
Trip.belongsToMany(Passenger, { through: "passengers_trips", timestamps: false });

User.hasOne(Passenger);
Passenger.belongsTo(User);

User.hasOne(Driver);
Driver.belongsTo(User);

Driver.hasMany(Car);
Car.belongsTo(Driver);

Passenger.hasMany(Comment);
Comment.belongsTo(Passenger);

Driver.hasMany(Comment);
Comment.belongsTo(Driver);

Trip.hasMany(Comment);
Comment.belongsTo(Trip);

Driver.hasMany(Trip);
Trip.belongsTo(Driver);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
