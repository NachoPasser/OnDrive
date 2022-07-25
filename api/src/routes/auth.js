const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  registerDriver,
  purchaseTrip,
  verifyUser,
<<<<<<< HEAD
  getDriver,
=======
  verifyBanStatus,
  getDriverById,
>>>>>>> 8437fe422302b0562b9a975aa27cdc10535ef780
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
router.post("/purchase-trip", purchaseTrip);
router.post("/getdriver", getDriver);

module.exports = router;
