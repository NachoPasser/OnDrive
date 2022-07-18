const { Admin } = require("../../Models/Admin"); //admin model
const { User } = require("../../Models/User");
const bcrypt = require("bcrypt");

//PARA AGREGAR UN NUEVO ADMIN A LA TABLA(NO UTILIZAR)
async function createAdmin({ username, password }) {
  try {
    //hash pass
    const passwordHash = await bcrypt.hash(password, 15);

    const [_admin, created] = await Admin.findOrCreate({
      where: { username },
      defaults: { username, password: passwordHash },
    });

    return created
      ? {
          msg: "Administradores Listos.",
        }
      : {
          msg: "Error al cargar los usuarios Administradores",
        };
  } catch (e) {
    return {
      msg: "Error al crear los Administradores - " + e.message,
    };
  }
}

//PARA VER SI UN USERNAME & PASSWORD ES DE UN ADMIN O NO
async function verifyAdmin({ username, password }) {
  try {
    const admin = await Admin.findOne({ where: { username } });
    if (admin === null) return false;

    //check password
    const valid = await bcrypt.compare(
      password,
      admin.getDataValue("password")
    );

    return valid; //(true or false)
  } catch (e) {
    console.error("Error al verificar el administrador - " + e.message);
    return false;
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
    console.error(e.message);
  }
}

//FUNCION PARA BANEAR / DESBANEAR USUARIOS POR EMAIL
async function setBanStatus(status = false, userEmail) {
  try {
    const foundUser = await User.findOne({
      where: { email: userEmail },
    }); //busco el user a banear/desbanear
    await foundUser.update({ ban_status: status }); //actualizo el ban status
    await foundUser.save(); //guardo en la database
    return "updated ban status to = " + status;
  } catch (e) {
    return "error set ban status - " + e.message;
  }
}

module.exports = { createAdmin, verifyAdmin, administrator, setBanStatus };
