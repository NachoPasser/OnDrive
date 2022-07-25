const { setBanStatus, verifyAdmin } = require("../Models/utils/Admin");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

async function banUser(req, res) {
  try {
    const { ban_email } = req.body;
    const msg = await setBanStatus(true, ban_email);
    res.json({ msg });
  } catch (e) {
    res.status(400);
    res.json({ msg: "Error: " + e.message });
  }
}

async function unbanUser(req, res) {
  try {
    const { unban_email } = req.body;
    const msg = await setBanStatus(false, unban_email);
    res.json({ msg });
  } catch (e) {
    res.status(400);
    res.json({ msg: "Error: " + e.message });
  }
}

async function logAdmin(req, res) {
  const { username, password } = req.body;
  try {
    const valid = await verifyAdmin({ username, password });
    if (!valid)
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrecta." });
    const token = jwt.sign({ type: "admin" }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (e) {
    res.send({ msg: "Error: " + e.message });
  }
}

module.exports = { banUser, unbanUser, logAdmin };
