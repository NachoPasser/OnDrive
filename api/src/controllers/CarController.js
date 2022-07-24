const {Driver} = require('../Models/Driver');
const {Car} = require('../Models/Car')
const {createCar} = require('../Models/utils/Creations'); 
const {findUserById} = require('../Models/utils/Finders');
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const addCar = async(req, res) => {
    try {
        const { user_id, decoded, car } = req.body;
        const {driver} = user_id 
        ? await findUserById({user_id, model: false, driver: true})
        : await findUserById({user_id: decoded.id, model: false, driver: true})
        const carCreated = await createCar(driver.driver_id, car);
        res.json(carCreated);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

const getCars = async(req, res) => {
    const cars = await Car.findAll({
        include: Driver
    });
    res.json(cars);
}

module.exports = {
    addCar,
    getCars
}