const { findAllUsers, findUserById } = require("../Models/utils/Finders");
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
    if (!email) throw new Error("mandatory data is missing");
    let user_id = await createUser({ email, password, name, last_name });

    if (!user_id)
      return res.json({ error: "there is already a user with that email" });

    const token = jwt.sign({ id: user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ token }); //return token JWT
  } catch (e) {
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

async function registerDriver(req, res) {
  try {
    const { user_id, driver } = req.body;
    const driver_id = await createDriver(user_id, driver);
    if (!driver_id) throw new Error("unexpected error");
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
      return res.status(401).json({ error: "Incorrect Email or Password" });
    }
    const token = jwt.sign({ id: user.user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token }); //return token JWT
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

const checkUserIsLogged = async (req, res) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (token !== "null") {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        return err
          ? res.json({ message: "Invalid Token" })
          : res.json({ message: "The user logged in" });
      });
    } else res.json({ message: "Token not provided" });
  } catch (e) {
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await findUserById({ user_id: id, driver: true });
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

const purchaseTrip = async (req, res) => {
  try {
    const { user_id, trip_id } = req.body;
    if (!user_id || !trip_id)
      throw new Error("crucial data is missing(user id or trip id)");
    const canBuy = await isFitToBuy(user_id, trip_id);
    if (!canBuy)
      return res
        .status(401)
        .json({ error: "you are not authorized to buy this trip" });
    //vincular viaje
    const trip = await assingTrip({ user_id, trip_id });
    res.json({ trip_purchased: trip });
  } catch (e) {
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
  registerDriver,
  loginUser,
  checkUserIsLogged,

  purchaseTrip,
};
