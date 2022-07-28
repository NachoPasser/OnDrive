const router = require("express").Router();
const { getIdFromToken } = require("../controllers/Middlewares/middleware.js");
const {
  recoverPassword,
  changePass,
  verifyRecoveryCode,
} = require("../controllers/passwordController.js");

router.post("/", recoverPassword);
router.post("/verify-code", verifyRecoveryCode);
router.post("/change",getIdFromToken,changePass);

module.exports = router;
