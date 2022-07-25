const { findAllUsers, findUserById, findDriverById } = require("../Models/utils/Finders");
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
const { Driver } = require("../Models/Driver");
const { User } = require("../Models/User");
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

    const type = password ? "pageUser" : "googleUser";
    const token = jwt.sign({ id: user_id, type }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ token }); //return token JWT
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

async function registerDriver(req, res) {
  try {
    const { user_id, decoded, driver } = req.body;
    const driver_id = user_id
      ? await createDriver(user_id, driver)
      : await createDriver(decoded.id, driver);
    if (!driver_id) throw new Error("Algo salio mal al crear el conductor");
    res.status(201).json({ driver_id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [valid, user, type] = await isCorrectCredentials(email, password);

    if (!valid) {
      return res.status(409).json({ error: "Mail o contraseña incorrecta." });
    }
    const token = jwt.sign({ id: user.user_id, type }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token }); //return token JWT
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: `${e.message}` });
  }
};

const verifyUser = async (req, res) => {
  const { decoded } = req.body;
  try {
    res.json({ type: decoded.type, id: decoded.id });
  } catch (e) {
    res.status(498).json({ type: "visitor" });
  }
};

const verifyBanStatus = async (req, res) => {
  const { decoded } = req.body;
  try {
    const user = await findUserById({ user_id: decoded.id, driver: true });

    const status = user.ban_status;
    const status_purchase = user.ban_purchase;
    const status_publish = user.driver ? user.driver.ban_publish : false;

    res.json({ type: decoded.type, id: decoded.id, status, status_purchase, status_publish });
  } catch (e) {
    res.status(498).json({ type: "visitor" });
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
    const { decoded, user_id } = req.body;
    const user = user_id
      ? await findUserById({ user_id, driver: true })
      : await findUserById({ user_id: decoded.id, driver: true });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

const getDriverById = async (req, res) => {
  try {
    const { driver_id } = req.headers['user_id']
    const driver = findDriverById({ driver_id })
    res.json(driver);
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

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

const getDriver = async (req, res) => {

  const { token } = req.body

  let driver = await Driver.findOne({
    where: {
      driver_id: token
    }
  })
  let user_id = driver.dataValues.user_id
  let user = await User.findOne({
    where: {
      user_id,
    }
  })
  let object = user.dataValues
  let objectWithoutPass = { ...object, password: null }
  return res.json(objectWithoutPass)
}

module.exports = {
  registerUser,
  getUsers,
  getUserById,
  getDriverById,
  registerDriver,
  loginUser,
  purchaseTrip,
  verifyUser,
  getDriver,
  verifyBanStatus,
};
