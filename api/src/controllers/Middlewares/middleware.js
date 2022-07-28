const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const checkUser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (token !== "null") {
      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) next(res.status(498).json({ type: "visitor" }));
        else {
          req.body = { ...req.body, decoded };
          next();
        }
      });
    } else next(res.status(498).json({ type: "visitor" }));
  } catch (e) {
    console.log(e);
  }
};

const getIdFromToken = async (req, res, next) => {
  try {
    let user_id = req.headers["user_id"];

    if (user_id) {
      req.body = { ...req.body, user_id };
      return next();
    }

    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (token !== "null") {
      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) next(res.status(401).json({ message: "Invalid Token." }));
        else {
          req.body = { ...req.body, user_id, decoded };
          next();
        }
      });
    } else next(res.status(404).json({ message: "Token not provided." }));
  } catch (e) {
    res.status(404).json({ message: "Token not provided." })
  }
};

module.exports = {
  checkUser,
  getIdFromToken,
};
