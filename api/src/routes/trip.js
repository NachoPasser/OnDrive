const {tripHistory, postTrip, getTrips} = require('../controllers/tripController.js');
const {getTripById} = require("../controllers/usersJson");
const router = require('express').Router();

//fake request
router.get("/:id",getTripById);

// router.get('/:id', tripHistory); request real para posterior uso
router.post('/', postTrip);
router.get('/', getTrips)
module.exports = router;