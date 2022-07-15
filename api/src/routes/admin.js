const { banUser, unbanUser, logAdmin, checkUserIsAdmin } = require("../controllers/adminController.js");
const router = require("express").Router();

router.post('/login', logAdmin)
router.put("/ban", banUser);
router.put("/unban", unbanUser);
router.get('/verify', checkUserIsAdmin)
module.exports = router;
