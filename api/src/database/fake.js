const { models } = require("./relations");
const { User, Driver, Car } = models;
const axios = require('axios')
const {API_IMG} = process.env
const {
  createUser,
  createDriver,
  createTripAsDriver,
} = require("../Models/utils/Creations");
const bcrypt = require("bcrypt");
const fakeData = require("./data.json");
const {
  combinationsB,
  combinationsA,
  letters,
  numbers,
  last_names,
  names,
  fakeCars,
  fakeTrips,
} = fakeData; //json

function generateEmail(name, age, last_name) {
  let type = ["gmail", "outlook", "hotmail", "yahoo"][
    Math.floor(Math.random() * 4)
  ];
  let prefix_year = age < 22 ? 20 : 19;
  const formats = [
    `${name}_${last_name}${prefix_year}${age}@${type}.com`,
    `${last_name}_${name}${prefix_year}${age}@${type}.com`,
    `${prefix_year}${age}_${name}${last_name}@${type}.com`,
  ];
  let email = formats[Math.floor(Math.random() * formats.length)];
  return email;
}

function generateDriverData() {
  let company = ["Federación Patronal", "Caja Seguros", "Seguros Rivadavia", "Sancor", "San Cristóbal", "Segunda C.S.L."][
    Math.floor(Math.random() * 6)
  ];
  let license = Math.floor(10000000 + Math.random() * 90000000)
  let DNI = Math.floor(10000000 + Math.random() * 90000000)
  let car_insurance = company

  return [license, car_insurance, DNI];
}

//patente
function generetaLicensePlate(is2016 = false) {
  //patentes estilo ABC 123
  let license_plate = "";
  if (!is2016) {
    for (let i = 0; i < 6; i++) {
      license_plate +=
        i < 3
          ? letters[Math.floor(Math.random() * letters.length)]
          : numbers[Math.floor(Math.random() * numbers.length)].toString();
    }
    return license_plate;
  }
  for (let i = 0; i < 7; i++) {
    license_plate +=
      i < 2 || i > 5
        ? letters[Math.floor(Math.random() * letters.length)]
        : numbers[Math.floor(Math.random() * numbers.length)].toString();
  }
  return license_plate;
  //patentes estilo DC 932 AB (2016)
}

async function createFakeUser({ age, name, last_name, email, password }) {
  try {
    password = await bcrypt.hash(password, 10);
    const created = await createUser({ name, last_name, email, password });
    if (!created) {
      email = generateEmail({ name, age, last_name }); //regenero nuevo email
      await createFakeUser({ age, name, last_name, email, password }); //vuelvo a crear
    }
  } catch (e) {
    console.error("error al crear uno de los usuarios falsos: ", e);
  }
}

//load users
async function loadFakeUsers() {
  try {
    let age, name, last_name, password, email;
    let user = null;

    for (let i = 0; i < 30; i++) {
      age = Math.floor(Math.random() * (60 - 18 + 1) + 18); // entre 18 y 60
      name = names[Math.floor(Math.random() * names.length)];
      last_name = last_names[Math.floor(Math.random() * last_names.length)];
      email = generateEmail(name, age, last_name);
      password = `${name}${last_name}2022`;

      //create user;
      user = { age, name, last_name, email, password };
      await createFakeUser(user);
    }
  } catch (e) {
    console.error("error al cargar usuarios falsos: ", e);
  }
}

//load driver
async function loadFakeDrivers() {
  try {
    let amount = await User.count(); //cant usuarios
    let users = await User.findAll({ limit: Math.floor(amount / 2) });

    //convertir a la mitad de los usuarios en drivers
    for (let u of users) {
      let [license, car_insurance, DNI] = generateDriverData();
      await createDriver(u.user_id, { license, car_insurance, DNI });
    }
  } catch (e) {
    console.error("error al crear conductores falsos: ", e);
  }
}

async function loadFakeCarsToDrivers() {
  try {
    const brand = ["ford", "chevrolet", "toyota", "honda"]
    let drivers = await Driver.findAll();
    let car = null;
    let is2016 = false;
    for (let d of drivers) {
      carInfo = fakeCars[Math.floor(Math.random() * fakeCars.length)];
      car = await Car.create({
        license_plate: generetaLicensePlate(is2016),
        brand: brand[Math.floor(Math.random() * brand.length)],
        capacity: Math.floor(Math.random() * (7) + 1),
        ...carInfo,
      });
      await d.addCar(car);
      is2016 = !is2016;
    }
  } catch (e) {
    console.error("error al cargar autos falsos ", e);
  }
}

async function loadFakeTrips() {
  try {
    let drivers = await Driver.findAll({
      include: Car
    });
    for (let d of drivers) {
      let user_id = d.getDataValue("user_id");
      let tripFake = fakeTrips[Math.floor(Math.random() * fakeTrips.length)];
      let car = d.cars[0].car_id
      //LO COMENTO PORQUE YA LO USE PARA CREAR VIAJES CON LOS NUEVOS DATOS, ESTA TODO EN data.json
      // const nameDestination = tripFake.destination;
      // const search = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,place_id&input=${nameDestination}&inputtype=textquery&key=${API_IMG}`)
      // const place_id = search.data.candidates[0].place_id
      // const searchPhotos = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_address%2Cphoto&place_id=${place_id}&key=${API_IMG}`)
      // const photos = searchPhotos.data.result.photos
      // const arrayImg = []
      // for(let i=0; i<3; i++){
      //   arrayImg.push(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[i].photo_reference}&key=${API_IMG}`)
      // }
      // tripFake['album'] = arrayImg
      // tripFake['capacity'] = Math.floor(Math.random() * (5 - 1) + 1)
      // tripFake['rating'] = Math.floor(Math.random() * 5)
      let tripCreated = await createTripAsDriver(user_id, car, tripFake);
    }
  } catch (e) {
    console.error("error al crear viajes falsos", e);
  }
}

async function loadFakeDatabase() {
  try {
    await loadFakeUsers();
    await loadFakeDrivers();
    await loadFakeCarsToDrivers();
    await loadFakeTrips();
  } catch (e) {
    console.error("error al iniciar datos falsos: ", e);
  }
}

module.exports = { loadFakeDatabase };
