const { User } = require("../../Models/User");

//OBTENER USUARIO POR EMAIL(obtiene email,id,name,last_name)
async function createUser({ email, password, name, last_name }) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, password, name, last_name },
    });
    if (!created)
      throw new Error(`there is already a user with that email(${email})`);
    return user.getDataValue("user_id");
  } catch (e) {
    throw new Error(`database error(${e.message})`);
  }
}

module.exports = { createUser };
