const {tripHistory, postTrip, getTrips} = require('../controllers/tripController.js');
const router = require('express').Router();

router.get('/:id', tripHistory);
router.post('/', postTrip);
router.get('/', getTrips)
module.exports = router;