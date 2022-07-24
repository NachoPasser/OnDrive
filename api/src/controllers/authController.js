const { findAllUsers, findUserById } = require("../Models/utils/Finders");
const bcrypt = require("bcrypt");
const {
  isCorrectCredentials,
  isFitToBuy,
} = require("../Models/utils/Confirmer");
const {
  createUser,
  createDriver,
  assingTrip,
} = require("../Models/utils/Creations");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
  try {
    const { email, password, name, last_name } = req.body;
    if (!email) throw new Error("Se necesita el email obligatoriamente");

    var user_id = await createUser({
      email,
      password: !password ? null : await bcrypt.hash(password, 10),
      name,
      last_name,
    });

    if (!user_id)
      return res
        .status(409)
        .json({ error: "Ya existe un usuario registrado con este mail." });

    const token = jwt.sign({ id: user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ token }); //return token JWT
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

async function registerDriver(req, res) {
  try {
    const { user_id, driver } = req.body;
    const driver_id = await createDriver(user_id, driver);
    if (!driver_id) throw new Error("Algo salio mal al crear el conductor");
    res.status(201).json({ driver_id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [valid, user] = await isCorrectCredentials(email, password);
    
    if (!valid) {
      return res.status(409).json({ error: "Mail o contraseña incorrecta." });
    }
    const token = jwt.sign({ id: user.user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token }); //return token JWT
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: `${e.message}` });
  }
};

const verifyUser = async (req, res) => {
  const { caso, decoded } = req.body;
  let user = null;
  if (res.status > 400) return res.send("");
  try {
    switch (caso) {
      case "googleUser":
        user = await findUserById({ user_id: decoded.id });
        if (!user.password)
          return res.status(202).json({ message: "The user is allowed." });
        else
          return res.status(403).json({ message: "Page users not allowed." });

      case "pageUser":
        if (!decoded.hasOwnProperty("id"))
          return res.status(400).json("No soy un usuario común.");
        user = await findUserById({ user_id: decoded.id });
        if (!user.password)
          return res.status(403).json({ message: "Google users not allowed." });
        else return res.status(202).json({ message: "The user is allowed." });

      case "admin":
        if (decoded.hasOwnProperty("isAdmin"))
          return res.status(202).json({ message: "The user is allowed." });
        else
          return res.status(403).json({ message: "The user is not allowed." });

      default:
        return res.status(200).send("Genial");
    }
  } catch (e) {
    // console.log(e)
    res.status(500).json(e);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const { decoded, id } = req.body;
    const user = id
      ? await findUserById({ user_id: id, driver: true })
      : await findUserById({ user_id: decoded.id, driver: true });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

const purchaseTrip = async (req, res) => {
  try {
    const { user_id, trip_id } = req.body;
    if (!user_id || !trip_id)
      throw new Error("Faltan datos del viaje o del usuario");
    const canBuy = await isFitToBuy(user_id, trip_id);
    if (!canBuy)
      return res
        .status(401)
        .json({ error: "No estas autorizado para comprar este viaje" });
    //vincular viaje
    const trip = await assingTrip({ user_id, trip_id });
    res.json({ trip_purchased: trip });
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
  registerDriver,
  loginUser,
  purchaseTrip,
  verifyUser,
};
