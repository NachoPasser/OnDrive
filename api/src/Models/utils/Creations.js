const { models } = require("../../database/relations");
const { isADriver } = require("./Confirmer");
const { findUserById, findTripById } = require("./Finders");
const { uploader } = require("../../config/cloudinary");

//models
const { User, Driver, Trip, Car, Capacity } = models;

async function createUser(userData = {}) {
  try {
    if (!userData || typeof userData !== "object")
      throw new Error("user missing properties");
    const [user, created] = await User.findOrCreate({
      where: { email: userData?.email },
      defaults: userData,
    });
    return created ? await user.getDataValue("user_id") : null;
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

async function createCar(driver_id, car = {}) {
  try {
    if (!driver_id || !car || typeof car !== "object")
      throw new Error("Faltan el auto o sus propiedades");
    const driver = await Driver.findByPk(driver_id);
    if (!driver) throw new Error(`Este usuario no es un conductor`);

    data = {
      model:car.model,
      brand:car.brand,
      type:car.type,
      license_plate:car.license_plate,
      year:car.year,
      color:car.color,
      fuel:car.fuel,
      capacity: car.capacity
    }

    console.log(data)
    const [carCreated, created] = await Car.findOrCreate({
      where: {
        driver_id,
        license_plate: car.license_plate,
      },
      defaults: data,
    });
    console.log(carCreated)
    if (created) {
      let { file } = car;
      console.log('FILE:',file)
      const result = await uploader.upload(file, { folder: "OnDrive" });
      console.log(result)
      await carCreated.update({ image: result.secure_url });
      await carCreated.save();
      console.log(carCreated)
      return carCreated.getDataValue("car_id");
    }

    return null;
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//CREAR UN DRIVER A PARTIR DEL ID DE UN USUARIO
async function createDriver(user_id = null, driverData = {}) {
  try {
    if (!user_id) throw new Error("the user id is needed to make it a driver");
    if (!driverData || typeof driverData !== "object")
      throw new Error(`driver missing properties`);
    const user = await findUserById({ user_id, model: true });
    if (user) {
      const [driver, created] = await Driver.findOrCreate({
        where: { user_id },
        defaults: driverData,
      });
      if (!created) throw new Error(`the user(${user_id}) is already a driver`);
      await driver.setUser(user);
      return driver.getDataValue("driver_id");
    }
    throw new Error(`the user(${user_id}) does not exist`);
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//CREAR UN VIAJE(VERIFICA SI SOS UN DRIVER PRIMERO)
async function createTripAsDriver(user_id, car_id, trip = {}) {
  try {
    if (!trip || typeof trip !== "object" || !car_id)
      throw new Error(`trip missing properties or missing car_id`);
    const [isDriver, driver] = await isADriver(user_id);
    if (!isDriver)
      throw new Error(
        `(${user_id}) is not a driver, only drivers can publish trips`
      );
    const car = await Car.findByPk(car_id)
    const driver_id = driver.getDataValue("driver_id");
    const newTrip = await Trip.create(
      {
        ...trip,
        driver_id,
      },
      {
        include: Driver
      }
    );
    await newTrip.setCar(car)
    if (!newTrip)
      throw new Error(
        `something has wrong to try create the trip. duplicate, invalid or wrong data`
      );
    return JSON.parse(JSON.stringify(newTrip, null, 2));
  } catch (e) {
    console.log(e)
    // throw new Error(`${e.message}`);
  }
}

async function createCapacityUsedByUser({ user = null, trip = null, number = null, model = false}){
  try{
    if (!user || !trip || !number) throw new Error("user or trip or capacity missing");
    const capacity = await trip.createCapacity({
      number,
      user_id: user.getDataValue('user_id')
    })

    return model ? capacity : JSON.parse(JSON.stringify(capacity, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

//ASIGNAR VIAJE A UN PASAJERO
async function assingTrip({ user_id = null, trip_id = null, capacity = null }) {
  try {
    if (!user_id || !trip_id || !capacity)
      throw new Error("user id or trip id or capacity missing");
    //buscar usuario
    const user = await findUserById({ user_id, model: true });
    if (!user) throw new Error("user id invalid or does not exist");
    //buscar viaje
    const trip = await findTripById({ trip_id, model: true });
    if (!trip) throw new Error("trip id invalid or does not exist");

    if(trip.getDataValue('capacity') < capacity) throw new Error('capacity is bigger than max allowed')
    if(capacity <= 0) throw new Error('capacity is lower or equal to 0')
    //me guardo el cambio de capacidad que hizo el usuario en el historial del viaje
    await createCapacityUsedByUser({user, trip, number: capacity})
    //actualizar capacidad del viaje
    let newCapacity = trip.getDataValue('capacity') - capacity
    await trip.update({capacity: newCapacity, isAvailable: !newCapacity ? false : true})
    await trip.save()
    //vincularlos
    await user.addTrip(trip);
    return JSON.parse(JSON.stringify(trip, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

module.exports = {
  createUser,
  createTripAsDriver,
  createDriver,
  createCar,
  assingTrip,
};
