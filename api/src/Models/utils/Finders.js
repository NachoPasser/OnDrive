const { User } = require("../User");
const { Driver } = require("../Driver");

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
    if (user === null)
      throw new Error(`the user with email(${email}) does not exist`);
    return JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    return `database error to try found user with email(${email})`;
  }
}

//OBTENER USUARIO POR ID(obtiene todos los datos de un usuario (pasajero + driver + viajes))
async function findUserById({ user_id = null, driver = false }) {
  try {
    if (!user_id) throw new Error(`findUserById required property missing(id)`);
    const user = await User.findByPk(user_id, {
      attributes: { exclude: "password" },
      include: driver
        ? [
            {
              model: Driver,
              attributes: { exclude: ["user_id", "userUserId", "driver_id"] },
              include: [{ model: Trip }, { model: Car }],
            },
            {
              model: Trip,
            },
          ]
        : null,
    });

    if (!user) throw new Error(`user ${user_id} not found`);
    return JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    throw new Error(`database error(${e.message})`);
  }
}

module.exports = { findUserByEmail, findUserById };
