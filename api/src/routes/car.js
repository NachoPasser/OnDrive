const {addCar, getCarsById} = require('../controllers/CarController');
const router = require('express').Router();
const { getIdFromToken } = require("../controllers/Middlewares/middleware.js");

router.post('/', getIdFromToken, addCar);
router.get('/', getIdFromToken, getCarsById);

module.exports = router;
