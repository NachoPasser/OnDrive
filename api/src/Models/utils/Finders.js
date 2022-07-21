const { models } = require("../../database/relations");
const { User, Driver, Trip, Car } = models;

async function findUserByEmail(email) {
  try {
    if (!email)
      throw new Error(`El Mail es necesario para realizar la busqueda`);

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: "password" },
    });
    if (!user) return null;
    return JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    throw new Error(`Error al intentar recuperar el usuario via Mail`);
  }
}

//OBTENER USUARIO POR ID(obtiene todos los datos de un usuario (pasajero + driver(optional) + viajes))
// model nos permite obtener el modelo de sequelize;
async function findUserById({ user_id = null, driver = false, model = false }) {
  try {
    if (!user_id)
      throw new Error(`Se necesita el ID del usuario para encontrarlo`);
    const user = await User.findByPk(user_id, {
      // attributes: { exclude: "password" },
      include: driver
        ? [
            {
              model: Driver,
              attributes: { exclude: ["user_id", "userUserId"] },
              include: [{ model: Trip }, { model: Car }],
            },
            {
              model: Trip,
              attributes: { exclude: "users_trips" },
            },
          ]
        : { model: Trip, attributes: { exclude: "users_trips" } },
    });
    if (!user) throw new Error(`user ${user_id} not found`);
    return model ? user : JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    throw new Error(`Error al intetar recuperar el usuario`);
  }
}

//Obtiene solo los datos como driver (DATOS,AUTOS,VIAJES PUBLICADOS)
async function findDriverById({ driver_id = null, model = false }) {
  try {
    if (!driver_id)
      throw new Error(`Se requiere el ID del conductor para encontrarlo`);
    const driver = await Driver.findByPk(driver_id, {
      include: [
        { model: User, attributes: { exclude: "password" } },
        {
          model: Trip,
          attributes: { exclude: ["driver_id", "driverDriverId"] },
        },
        {
          model: Car,
        },
      ],
      attributes: { exclude: ["userUserId", "user_id"] },
    });

    if (!driver) throw new Error(`driver ${driver_id} not found`);
    return model ? driver : JSON.parse(JSON.stringify(driver, null, 2));
  } catch (e) {
    throw new Error(`Error al intentar recuperar el conductor`);
  }
}

async function findTripById({ trip_id = null, model = false }) {
  try {
    if (!trip_id)
      throw new Error("Se necesita el ID del viaje para encontrarlo");
    const trip = await Trip.findByPk(trip_id, {
      include: User,
      attributes: { exclude: ["password", "users_trips"] },
    });
    if (!trip) throw new Error(`Viaje no encontrado`);
    return model ? trip : JSON.parse(JSON.stringify(trip, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

async function findAllTrips(arrayModel = false) {
  try {
    const trips = await Trip.findAll();
    return arrayModel ? trips : JSON.parse(JSON.stringify(trips, null, 2));
  } catch (e) {
    throw new Error(`Error al recuperar los viajes`);
  }
}

async function findAllUsers(arrayModel = false) {
  try {
    const users = await User.findAll({ attributes: { exclude: "password" } });
    return arrayModel ? users : JSON.parse(JSON.stringify(users, null, 2));
  } catch (e) {
    throw new Error(`Error al recuperar los usuarios`);
  }
}

module.exports = {
  findUserByEmail,
  findUserById,
  findDriverById,
  findAllUsers,
  findAllTrips,
  findTripById,
};
