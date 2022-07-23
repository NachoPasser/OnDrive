const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const checkUser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    let caso = req.headers["case"];
    //   console.log(req.headers)

    if (token !== "null") {
      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) next(res.status(401).json({ message: "Invalid Token." }))
        else {
          req.body = { ...req.body, caso, decoded }
          next()
        }
      });
    } else next(res.status(404).json({ message: "Token not provided." }));
  } catch (e) {
    console.log(e)
  }
}

const getIdFromToken = async (req, res, next) => {
  try {
    let id = req.headers["user_id"];

    if (id) {
      req.body = { ...req.body, id }
      return next()

    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (token !== "null") {
      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) next(res.status(401).json({ message: "Invalid Token." }))
        else {
          req.body = { ...req.body, id, decoded }
          next()
        }
      });
    } else next(res.status(404).json({ message: "Token not provided." }));
  } catch (e) {
    console.log(e)
  }
}