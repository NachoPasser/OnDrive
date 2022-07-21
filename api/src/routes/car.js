const {addCar, getCars} = require('../controllers/carController');
const router = require('express').Router();

router.post('/car/:token', addCar);
router.get('/car', getCars);

module.exports = router;