const { Driver } = require("../Models/Driver");
const { Car } = require("../Models/Car");
const { createCar } = require("../Models/utils/Creations");
const { findUserById } = require("../Models/utils/Finders");

const addCar = async (req, res) => {
  try {
    const { user_id, decoded } = req.body;
    const { model, brand, type, license_plate, year, color, fuel, capacity } = req.body;

    let car = {
      file: req.file.path,
      model,
      brand,
      type,
      license_plate,
      year,
      color,
      fuel,
      capacity
    };

    const { driver } = user_id
      ? await findUserById({ user_id, model: false, driver: true })
      : await findUserById({ user_id: decoded.id, model: false, driver: true });
   
    const carCreated = await createCar(driver.driver_id, car);
    res.json(carCreated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getCarById = async(req, res) => {
    try{
        let car_id = req.params.id
        const car = await Car.findByPk(car_id)
        res.json(JSON.parse(JSON.stringify(car, null, 2)))
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
    getCars,
    getCarById 
}
