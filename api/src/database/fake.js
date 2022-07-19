const { models } = require("./relations");
const { User, Driver, Car } = models;
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

function generateLicenseAndPermit() {
  let license = combinationsA[Math.floor(Math.random() * combinationsA.length)];
  let permit =
    license +
    "-" +
    combinationsB[Math.floor(Math.random() * combinationsB.length)];

  return [license, permit];
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
    console.log(`usuario con ${email} creado`);
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
      console.log(password);

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
      let [license, driving_permit] = generateLicenseAndPermit();
      await createDriver(u.user_id, { license, driving_permit });
      console.log(`${u.getDataValue("email")} ahora es un conductor`);
    }
  } catch (e) {
    console.error("error al crear conductores falsos: ", e);
  }
}

async function loadFakeCarsToDrivers() {
  try {
    let drivers = await Driver.findAll();
    let car = null;
    let is2016 = false;
    for (let d of drivers) {
      carInfo = fakeCars[Math.floor(Math.random() * fakeCars.length)];
      car = await Car.create({
        license_plate: generetaLicensePlate(is2016),
        ...carInfo,
      });
      await d.addCar(car);
      console.log(
        "Auto agregado al conductor (" + d.getDataValue("driver_id") + ")"
      );
      is2016 = !is2016;
    }
  } catch (e) {
    console.error("error al cargar autos falsos ", e);
  }
}

async function loadFakeTrips() {
  try {
    let drivers = await Driver.findAll();
    for (let d of drivers) {
      let user_id = d.getDataValue("user_id");
      let tripFake = fakeTrips[Math.floor(Math.random() * fakeTrips.length)];
      let tripCreated = await createTripAsDriver(user_id, tripFake);
      console.log(
        `viaje ${tripCreated.origin} -> ${tripCreated.destination}, creado.`
      );
    }
  } catch (e) {
    console.error("error al crear viajes falsos", e);
  }
}

async function loadFakeDatabase() {
  try {
    console.log("--------------------------------------------------");
    console.log("CARGANDO USUARIOS FALSOS...                       ");
    console.log("--------------------------------------------------");
    await loadFakeUsers();
    console.log("--------------------------------------------------");
    console.log("CONVIRTIENDO ALGUNOS USUARIOS A CONDUCTORES...    ");
    console.log("--------------------------------------------------");
    await loadFakeDrivers();
    console.log("--------------------------------------------------");
    console.log("AGREGANDO AUTOS FALSOS A CONDUCTORES...           ");
    console.log("--------------------------------------------------");
    await loadFakeCarsToDrivers();
    console.log("--------------------------------------------------");
    console.log("PUBLICANDO VIAJES FALSOS...                       ");
    console.log("--------------------------------------------------");
    await loadFakeTrips();
  } catch (e) {
    console.error("error al iniciar datos falsos: ", e);
  }
}

module.exports = { loadFakeDatabase };
