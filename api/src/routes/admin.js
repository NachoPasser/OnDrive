const { banUser, unbanUser } = require("../controllers/adminController.js");
const router = require("express").Router();

// router.get('/:id', tripHistory);
router.put("/ban", banUser);
router.put("/unban", unbanUser);
module.exports = router;
