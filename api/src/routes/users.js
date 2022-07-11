const router = require('express').Router();
const { getTripsUsersFake, usersJson, getStaticUsers } = require('../controllers/usersJson.js');
//Ordené las rutas de index en un solo archivo para exportarlas
router.get('/driver', getTripsUsersFake);
router.get('/driver/:idParams', getTripsUsersFake)
router.get('/static', getStaticUsers);
router.get('/users', usersJson);

module.exports = router;