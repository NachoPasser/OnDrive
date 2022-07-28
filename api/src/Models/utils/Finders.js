const { models } = require("../../database/relations");
const { Review } = require("../Review");
const { User, Driver, Trip, Car, Capacity } = models;
const axios = require('axios')
var { API_IMG } = process.env

async function findUserByEmail({
  email = null,
  model = false,
  include_code = false,
  include_password = false,
}) {
  try {
    if (!email)
      throw new Error(`El Mail es necesario para realizar la busqueda`);

    const user = await User.findOne({
      where: { email },
      attributes:
        !include_code && !include_password
          ? { exclude: ["password", "recovery_code"] }
          : include_code && !include_password
            ? { exclude: "password" }
            : !include_code && include_password
              ? { exclude: "recovery_code" }
              : {},
    });
    if (!user) return null;
    return model ? user : JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    throw new Error(`Error al intentar recuperar el usuario via Mail`);
  }
}

//OBTENER USUARIO POR ID(obtiene todos los datos de un usuario (pasajero + driver(optional) + viajes))
// model nos permite obtener el modelo de sequelize;
async function findUserById({ user_id = null, driver = false, model = false }) {
  try {
    if (!user_id)
      throw new Error(`Se necesita el ID del usuario para encontrarlo`);
    const user = await User.findByPk(user_id, {
      // attributes: { exclude: "password" },
      include: driver
        ? [
          {
            model: Driver,
            attributes: { exclude: ["user_id", "userUserId"] },
            include: [{ model: Trip, include: [{ model: Review }] }, { model: Car }],

          },
          {
            model: Trip,
            include: [{ model: Review }],
            attributes: { exclude: "users_trips" },
          },
        ]
        : { model: Trip, include: [{ model: Review }], attributes: { exclude: "users_trips" } },
    });
    if (!user) throw new Error(`user ${user_id} not found`);
    return model ? user : JSON.parse(JSON.stringify(user, null, 2));
  } catch (e) {
    throw new Error(`Error al intetar recuperar el usuario`);
  }
}

//Obtiene solo los datos como driver (DATOS,AUTOS,VIAJES PUBLICADOS)
async function findDriverById({ driver_id = null, model = false }) {
  try {
    if (!driver_id)
      throw new Error(`Se requiere el ID del conductor para encontrarlo`);
    const driver = await Driver.findByPk(driver_id, {
      include: [
        { model: User, attributes: { exclude: "password" } },
        {
          model: Trip,
          attributes: { exclude: ["driver_id", "driverDriverId"] },
        },
        {
          model: Car,
        },
      ],
      attributes: { exclude: ["userUserId", "user_id"] },
    });

    if (!driver) throw new Error(`driver ${driver_id} not found`);
    return model ? driver : JSON.parse(JSON.stringify(driver, null, 2));
  } catch (e) {
    console.log(e)
    throw new Error(`Error al intentar recuperar el conductor`);
  }
}

async function findTripById({ trip_id = null, model = false }) {
  try {
    if (!trip_id)
      throw new Error("Se necesita el ID del viaje para encontrarlo");
    const trip = await Trip.findByPk(trip_id, {
      include: [{ model: User, attributes: { exclude: ["password", "users_trips"] } }, Review, Capacity],
    });
    if (!trip) throw new Error(`Viaje no encontrado`);
    return model ? trip : JSON.parse(JSON.stringify(trip, null, 2));
  } catch (e) {
    throw new Error(`${e.message}`);
  }
}

async function findAllTrips(arrayModel = false) {
  try {
    const trips = await Trip.findAll();
    return arrayModel ? trips : JSON.parse(JSON.stringify(trips, null, 2));
  } catch (e) {
    throw new Error(`Error al recuperar los viajes`);
  }
}

async function findAllUsers(arrayModel = false) {
  try {
    const users = await User.findAll({ attributes: { exclude: "password" }, include: [{ model: Driver, include: [{ model: Trip, include: [Review] }] }] });
    return arrayModel ? users : JSON.parse(JSON.stringify(users, null, 2));
  } catch (e) {
    throw new Error(`Error al recuperar los usuarios`);
  }
}

async function findReview(user_id, trip_id, model = false) {
  try {
    const review = await Review.findOne({ where: { user_id, trip_id } });
    return model ? review : JSON.parse(JSON.stringify(review, null, 2))
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
}

async function findAllReviews(user_id) {
  try {
    const review = await Review.findAll({ where: { user_id } });
    return JSON.parse(JSON.stringify(review, null, 2))
  } catch (e) {
    throw new Error(`Error: ${e.message}`);
  }
}

async function findPhotos(destination) {
  try {
    const search = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,place_id&input=${destination}&inputtype=textquery&key=${API_IMG}`)
    const place_id = search.data.candidates[0].place_id
    // console.log(search.data)
    // console.log('-----------------------------------------------------------------')
    // console.log(place_id)
    const searchPhotos = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=formatted_address%2Cphoto&place_id=${place_id}&key=${API_IMG}`)
    // console.log('-----------------------------------------------------------------')
    // console.log(searchPhotos.data)
    // console.log('-----------------------------------------------------------------')
    const photos = searchPhotos.data.result.photos
    // console.log(photos)
    const arrayImg = []
    let i = 0
    if (photos !== undefined) {
      while(arrayImg.length !== 3 && i < photos.length){
        if(photos[i] && photos[i].photo_reference !== null){
        arrayImg.push(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[i].photo_reference}&key=${API_IMG}`)
        }
        i++;
      }
    } else {
      arrayImg.push('https://res.cloudinary.com/on-drive/image/upload/v1658991247/OnDrive/trip-default_mdav0t.webp')
    }

    return arrayImg
  } catch (e) {
    console.log(e)
    throw new Error(`Error: ${e.message}`);
  }
}

module.exports = {
  findUserByEmail,
  findUserById,
  findDriverById,
  findAllUsers,
  findAllTrips,
  findTripById,
  findReview,
  findAllReviews,
  findPhotos
};
