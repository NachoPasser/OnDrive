const router = require("express").Router();
const {
  recoverPassword,
  changePass,
  verifyRecoveryCode,
} = require("../controllers/passwordController.js");

router.post("/", recoverPassword);
router.post("/verify-code", verifyRecoveryCode);
router.post("/change/:token", changePass);

module.exports = router;
