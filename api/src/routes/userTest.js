const router = require('express').Router();
const {getTripsUsersFake, usersJson, getStaticUsers} = require('../controllers/usersJson.js');

router.get('/driver', getTripsUsersFake);
router.get('/users', usersJson);
router.get('/static', getStaticUsers);

module.exports = router;