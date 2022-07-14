const { User } = require("../../db");

//OBTENER USUARIO POR EMAIL
async function findUserByEmail(email) {
  try {
    if (!email)
      throw new Error(
        `an email is needed to search for the user, email: ${email}`
      );
    const user = await User.findOne({ where: { email } });
    return user; //retorno instancia del usuario obtenida de la base de datos
  } catch (e) {
    return e.message;
  }
}

module.exports = { findUserByEmail };
