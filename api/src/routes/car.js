const {addCar, getCars, getCarById} = require('../controllers/CarController');
const router = require('express').Router();
const { getIdFromToken } = require("../controllers/Middlewares/middleware.js");
const { imageUploader } = require("../controllers/Middlewares/imageUploader");

router.post('/',imageUploader, getIdFromToken, addCar);
router.get('/', getCars);
router.get('/:id', getCarById)

module.exports = router;
