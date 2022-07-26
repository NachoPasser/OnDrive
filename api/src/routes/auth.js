const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  registerDriver,
  verifyUser,
  getDriver,
  verifyBanStatus,
  getDriverById,
} = require("../controllers/authController.js");
const {
  checkUser,
  getIdFromToken,
} = require("../controllers/Middlewares/middleware.js");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", checkUser, verifyUser);
router.get("/verify/status", checkUser, verifyBanStatus);
router.get('/driver', getDriverById)
router.get("/users", getUsers);
router.get("/profile", getIdFromToken, getUserById);
router.post("/register-driver", getIdFromToken, registerDriver);

module.exports = router;
