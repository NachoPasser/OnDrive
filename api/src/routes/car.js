const {addCar, getCars} = require('../controllers/CarController');
const router = require('express').Router();
const { getIdFromToken } = require("../controllers/Middlewares/middleware.js");
const { imageUploader } = require("../controllers/Middlewares/imageUploader");

router.post('/',imageUploader, getIdFromToken, addCar);
router.get('/', getCars);

module.exports = router;
