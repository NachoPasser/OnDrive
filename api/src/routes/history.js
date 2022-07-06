const {tripHistory, postHistoryTrip} = require('../controllers/historyController.js');
const router = require('express').Router();

router.get('/:id', tripHistory);
router.post('/', postHistoryTrip);

module.exports = router;