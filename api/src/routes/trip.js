const {
  tripHistory,
  postTrip,
  getTrips,
  getTripById,
} = require("../controllers/tripController.js");

// const { getTripById } = require("../controllers/usersController.js");
const router = require("express").Router();

// router.get('/:id', tripHistory);
router.get("/:id", getTripById);
router.post("/", postTrip);
router.get("/", getTrips);
module.exports = router;
