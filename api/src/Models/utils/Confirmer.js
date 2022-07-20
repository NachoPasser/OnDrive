const { models } = require("../../database/relations");
const { findUserById } = require("./Finders");
const { Driver, User, Car, Trip } = models;
const bcrypt = require("bcrypt");

//verificar si es driver respuesta Array[boolean,Model]
async function isADriver(user_id) {
  try {
    const driver = await Driver.findOne({
      where: { user_id },
      include: [{ model: User }, { model: Car }, { model: Trip }],
    });
    if (!driver) return [false, driver];
    return [true, driver];
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//verificar credenciales
async function isCorrectCredentials(email = null, password = null) {
  try {
    if (!email) throw new Error("invalid credentials, missing email");
    const user = await User.findOne({ where: { email } });

    if (!user || !user.getDataValue("password")) return [false, null];

    const valid = await bcrypt.compare(password, user.getDataValue("password"));

    return valid ? [true, user] : [false, null];
  } catch (e) {
    console.log(e);
    throw new Error("Error al comprobar credenciales");
  }
}

//verifica si un usuario puede comprar un viaje
async function isFitToBuy(user_id = null, trip_id = null) {
  try {
    if (!user_id || !trip_id)
      throw new Error("a null user or trip cannot be compared.");
    const [isDriver, driver] = await isADriver(user_id);
    if (!isDriver) {
      //ver si el usuario ya tiene ese viaje
      const user = await findUserById({ user_id });
      if (user.trips.some((trip) => trip.trip_id === trip_id))
        throw new Error("the user already has this trip assigned");
      return [true, driver];
    }
    //comprobar que el viaje a comprar no pertenezca al usuario mismo.
    const isOwner = driver.dataValues.trips.some(
      (trip) => trip.trip_id === trip_id
    );
    return isOwner ? false : true;
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

module.exports = { isADriver, isCorrectCredentials, isFitToBuy };
