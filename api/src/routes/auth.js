const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  checkUserIsLogged,
  registerDriver,
  purchaseTrip,
} = require("../controllers/authController.js");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", checkUserIsLogged);
router.get("/users", getUsers);
router.get("/profile/:id", getUserById);
router.post("/register-driver", registerDriver);
router.post("/purchase-trip", purchaseTrip);

module.exports = router;
