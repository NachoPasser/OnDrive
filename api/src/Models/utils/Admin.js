const { Admin } = require("../../Models/Admin"); //admin model
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
          msg: "admin/s ready",
        }
      : {
          msg: "error loading admins(not initialized)",
        };
  } catch (e) {
    return {
      msg: "error on create admin: " + e.message,
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
    return { msg: "Error verify admin: " + e.message };
  }
}

//INICIALIZA LOS ADMINS
async function administrator() {
  try {
    const { msg } = await createAdmin({
      username: process.env.ADMIN,
      password: process.env.ADMIN_PASS,
    });
    console.log(msg);
  } catch (e) {
    console.error("error initialization admin: " + e.message);
  }
}

//FUNCION PARA BANEAR / DESBANEAR USUARIOS POR EMAIL
async function setBanStatus(status = false, userEmail) {
  try {
    const foundUser = await findUserByEmail(userEmail); //busco el user a banear/desbanear
    await foundUser.update({ ban_status: status }); //actualizo el ban status
    await foundUser.save(); //guardo en la database
    return "updated ban status to: " + status;
  } catch (e) {
    return "error set ban status: " + e.message;
  }
}

module.exports = { createAdmin, verifyAdmin, administrator, setBanStatus };
