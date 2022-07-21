const {Driver} = require('../Models/Driver');
const {Car} = require('../Models/Car')
const {createCar} = require('../Models/utils/Creations'); 
const {findUserById} = require('../Models/utils/Finders');
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const addCar = async(req, res) => {
    try {
        const { token } = req.params;
        let user_id = 0;
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ message: "Token inválida." });
            } else {
                user_id = decoded.id;
            }
        });
        const {car} = req.body;
        const {driver} = await findUserById({user_id, model: false, driver: true});
        if(!driver) throw new Error(`driver ${driver.driver_id} not found`);
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