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

const getCarsById = async (req, res) => {
    try {
        const { decoded, user_id } = req.body;
        const user = user_id
            ? await findUserById({ user_id, driver: true })
            : await findUserById({ user_id: decoded.id, driver: true });
        console.log(user);
        res.json(user.driver.cars);
    } catch (e) {
        res.status(400).json({ error: `${e.message}` });
    }
};

module.exports = {
    addCar,
    getCarsById
}