const { models } = require("../../database/relations");
const { isADriver } = require("./Confirmer");
const { findUserById, findTripById } = require("./Finders");

//models
const { User, Driver, Trip } = models;

async function createUser(userData = {}) {
  try {
    if (!userData || typeof userData !== "object")
      throw new Error("user missing properties");
    const [user, created] = await User.findOrCreate({
      where: { email: userData?.email },
      defaults: userData,
    });
    return created ? user.getDataValue("user_id") : null;
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//CREAR UN DRIVER A PARTIR DEL ID DE UN USUARIO
async function createDriver(user_id = null, driverData = {}) {
  try {
    if (!user_id) throw new Error("the user id is needed to make it a driver");
    if (!driverData || typeof driverData !== "object")
      throw new Error(`driver missing properties`);
    const user = await findUserById({ user_id, model: true });
    if (user) {
      const [driver, created] = await Driver.findOrCreate({
        where: { user_id },
        defaults: driverData,
      });
      if (!created) throw new Error(`the user(${user_id}) is already a driver`);
      await driver.setUser(user);
      return driver.getDataValue("driver_id");
    }
    throw new Error(`the user(${user_id}) does not exist`);
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//CREAR UN VIAJE(VERIFICA SI SOS UN DRIVER PRIMERO)
async function createTripAsDriver(user_id, trip = {}) {
  try {
    if (!trip || typeof trip !== "object")
      throw new Error(`trip missing properties`);
    const [isDriver, driver] = await isADriver(user_id);
    if (!isDriver)
      throw new Error(
        `(${user_id}) is not a driver, only drivers can publish trips`
      );
    const driver_id = driver.getDataValue("driver_id");
    const newTrip = await Trip.create(
      {
        ...trip,
        driver_id,
      },
      {
        include: Driver,
      }
    );
    if (!newTrip)
      throw new Error(
        `something has wrong to try create the trip. duplicate, invalid or wrong data`
      );
    return JSON.parse(JSON.stringify(newTrip, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

async function assingTrip({ user_id = null, trip_id = null }) {
  try {
    if (!user_id || !trip_id) throw new Error("user id or trip id missing");
    //buscar usuario
    const user = await findUserById({ user_id, model: true });
    if (!user) throw new Error("user id invalid or does not exist");
    //buscar viaje
    const trip = await findTripById({ trip_id, model: true });
    if (!trip) throw new Error("trip id invalid or does not exist");
    //vincularlos
    await user.addTrip(trip);
    return JSON.parse(JSON.stringify(trip, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

module.exports = { createUser, createTripAsDriver, createDriver, assingTrip };
