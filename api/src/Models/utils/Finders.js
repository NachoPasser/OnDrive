const { models } = require("../../database/relations");
const { User, Driver, Trip, Car } = models;

async function findUserByEmail(email) {
  try {
    if (!email)
      throw new Error(
        `an email is needed to search for the user, email(${email})`
      );
    
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: "password" },
    });
    if (!user) return null;
    return JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//OBTENER USUARIO POR ID(obtiene todos los datos de un usuario (pasajero + driver(optional) + viajes))
// model nos permite obtener el modelo de sequelize;
async function findUserById({ user_id = null, driver = false, model = false }) {
  try {
    if (!user_id) throw new Error(`findUserById required property missing(id)`);
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
    throw new Error(`${e}`);
  }
}

//Obtiene solo los datos como driver (DATOS,AUTOS,VIAJES PUBLICADOS)
async function findDriverById({ driver_id = null, model = false }) {
  try {
    if (!driver_id)
      throw new Error(`find driver by id required property missing(id)`);
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
    throw new Error(`${e.message}`);
  }
}

async function findTripById({ trip_id = null, model = false }) {
  try {
    if (!trip_id) throw new Error("need the trip id to find it");
    const trip = await Trip.findByPk(trip_id);
    if (!trip) throw new Error(`trip ${trip_id} not found.`);
    return model ? trip : JSON.parse(JSON.stringify(trip, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

async function findAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

module.exports = {
  findUserByEmail,
  findUserById,
  findDriverById,
  findAllUsers,
  findTripById,
};
