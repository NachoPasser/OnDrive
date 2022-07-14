const { Admin } = require("../../db"); //admin model

//PARA AGREGAR UN NUEVO ADMIN A LA TABLA
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

//PARA VER SI UN ID ES DE UN ADMIN O NO
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

module.exports = { createAdmin, verifyAdmin, initAdmin };
