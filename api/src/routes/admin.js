const { banUser, unbanUser, logAdmin} = require("../controllers/adminController.js");
const router = require("express").Router();

router.post('/login', logAdmin)
router.put("/ban", banUser);
router.put("/unban", unbanUser);
module.exports = router;
