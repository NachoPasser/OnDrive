const { Admin } = require("../../db"); //admin model
const { findUserByEmail } = require("./User");

//PARA AGREGAR UN NUEVO ADMIN A LA TABLA(NO UTILIZAR)
async function createAdmin({ username, password }) {
  try {
    const [admin, created] = await Admin.findOrCreate({
      where: { username },
      defaults: { username, password },
    });

    return created
      ? {
          msg: "Admin created",
        }
      : {
          msg: "Could not create Admin",
        };
  } catch (e) {
    return {
      msg: "error: " + e.message,
    };
  }
}

//PARA VER SI UN USERNAME & PASSWORD ES DE UN ADMIN O NO
async function verifyAdmin({ username, password }) {
  try {
    const admin = await Admin.findOne({ where: { username, password } });
    if (admin === null) return false;
    return true;
  } catch (e) {
    return { msg: "Error: " + e.message };
  }
}

//INICIALIZA LOS ADMINS
async function initAdmin() {
  try {
    const { msg } = await createAdmin({
      username: process.env.ADMIN,
      password: process.env.ADMIN_PASS,
    });
    console.log(msg);
  } catch (e) {
    console.error(e.message);
  }
}

//FUNCION PARA BANEAR / DESBANEAR USUARIOS POR EMAIL
async function setBanStatus(status = false, userEmail) {
  try {
    const foundUser = await findUserByEmail(userEmail); //busco el user a banear/desbanear
    await foundUser.update({ ban_status: status }); //actualizo el ban status
    await foundUser.save(); //guardo en la database
    return "Updated ban status to: " + status;
  } catch (e) {
    return e.message;
  }
}

module.exports = { createAdmin, verifyAdmin, initAdmin, setBanStatus };
