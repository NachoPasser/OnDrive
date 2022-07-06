require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ondrive`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Car, Comment, Driver, Passenger, Roles, Trip, User } = sequelize.models;

//Relations
//---------

//User ---:M --> Rol
//User <--:N--- Rol
User.belongsToMany(Roles, {
  through: "user_rol",
  foreignKey: "user_id",
  timestamps: false,
});

Roles.belongsToMany(User, {
  through: "user_rol",
  foreignKey: "rol_id",
  timestamps: false,
});

//Driver ---1:M---> Rol
Driver.belongsTo(Roles,{sourceKey:"id",foreignKey:"rol_id"});

//Driver ---1:M ---> Car
Driver.belongsTo(Car,{sourceKey:"id",foreignKey:"car_id"});

//Passenger ---1:M---> Rol
Passenger.belongsTo(Roles,{sourceKey:"id",foreignKey:"rol_id"});

//Passenger / Driver / Trip --- 1:M ----> Comment
Comment.belongsTo(Passenger,{sourceKey:"id",foreignKey:"passenger_id"});
Comment.belongsTo(Driver,{sourceKey:"id",foreignKey:"driver_id"});
Comment.belongsTo(Trip,{sourceKey:"id",foreignKey:"trip_id"});

//Passenger M:N Trip
Passenger.belongsToMany(Trip, {
  through: "passenger_trip",
  foreignKey: "passenger_id",
  timestamps: false,
});

Trip.belongsToMany(Passenger, {
  through: "passenger_trip",
  foreignKey: "trip_id",
  timestamps: false,
});


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
