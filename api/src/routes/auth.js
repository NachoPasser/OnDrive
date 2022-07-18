const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  registerDriver,
  purchaseTrip,
  verifyUser,
} = require("../controllers/authController.js");
const { checkUser } = require("../controllers/Middlewares/middleware.js");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/verify', checkUser, verifyUser)
router.get("/users", getUsers);
router.get("/profile/:id", getUserById);
router.post("/register-driver", registerDriver);
router.post("/purchase-trip", purchaseTrip);

module.exports = router;
