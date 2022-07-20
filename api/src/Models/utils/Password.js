const bcrypt = require("bcrypt");
const { findUserByEmail } = require("./Finders");
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const letters = "abcdefghijklmnopqrstuvwyz";

function generateRecoveryCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code +=
      i % 2 !== 0
        ? numbers[Math.floor(Math.random() * numbers.length)]
        : letters[Math.floor(Math.random() * letters.length)];
  }
  return code.toUpperCase();
}

function resetCode({ user = null, mins = 5 }) {
  let ms = mins * 60000;
  let timeout = setTimeout(async () => {
    user.set({
      recovery: null,
    });
    await user.save();
  }, ms);

  return timeout;
}

async function compareRecoveryCode({
  email = null,
  code = null,
  timeout = null,
}) {
  try {
    const regExp = /[A-Z][0-9][A-Z][0-9][A-Z][0-9]/g;
    if (!regExp.test(code)) throw new Error("Codigo invalido");
    const user = await findUserByEmail({
      email,
      include_code: true,
      model: true,
    });

    if (!user["recovery"]) throw new Error("Codigo caducado");
    const valid = await bcrypt.compare(code, user["recovery"]);
    //si coincide limpio el codigo
    if (valid) {
      clearTimeout(timeout); //elimino el countdown
      user.set({
        recovery: null,
      });
      await user.save();
      return [true, user.user_id];
    }
    return [false, null];
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { generateRecoveryCode, compareRecoveryCode, resetCode };
