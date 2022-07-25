const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  registerDriver,
  purchaseTrip,
  verifyUser,
  getDriverById,
} = require("../controllers/authController.js");
const { checkUser, getIdFromToken } = require("../controllers/Middlewares/middleware.js");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/verify', checkUser, verifyUser)
router.get('/driver', getDriverById)
router.get("/users", getUsers);
router.get("/profile", getIdFromToken, getUserById);
router.post("/register-driver", getIdFromToken, registerDriver);
router.post("/purchase-trip", purchaseTrip);

module.exports = router;
