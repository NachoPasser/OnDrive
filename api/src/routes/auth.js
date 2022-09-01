const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  registerDriver,
  verifyUser,
  verifyBanStatus,
  getDriverById,
  getDriversOrderByRatings,
  uploadProfileImage,
} = require("../controllers/authController.js");
const {
  checkUser,
  getIdFromToken,
} = require("../controllers/Middlewares/middleware.js");
const { imageUploader } = require("../controllers/Middlewares/imageUploader");
const router = require("express").Router();

router.post("/register", registerUser);
router.put("/profile/image", imageUploader, checkUser, uploadProfileImage);
router.post("/login", loginUser);
router.get("/verify", checkUser, verifyUser);
router.get("/verify/status", checkUser, verifyBanStatus);
router.get("/driver", getDriverById);
router.get('/ratings', getDriversOrderByRatings)
router.get("/users", getUsers);
router.get("/profile", getIdFromToken, getUserById);
router.post("/register-driver", getIdFromToken, registerDriver);

module.exports = router;
