const { createTripAsDriver, assingTrip } = require("../Models/utils/Creations");
const {createReview, updateReview, updateDriverRating} = require('../Models/utils/Review')
const { findAllTrips, findTripById, findReview, findAllReviews, findPhotos, findDriverById, findUserById} = require("../Models/utils/Finders");
const {isFitToBuy} = require('../Models/utils/Confirmer')
const postTrip = async (req, res) => {
  try {
    const { user_id, decoded, trip } = req.body;
    const publishedTrip = await createTripAsDriver(user_id ? user_id : decoded.id, trip)
    res.status(201).json(publishedTrip);
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

const getTrips = async (req, res) => {
  try {
    const trips = await findAllTrips();
    return res.json(trips);
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await findTripById({ trip_id: id });
    res.json(trip);
  } catch (e) {
    //response error
    res.status(400).json({ error: `${e.message}` });
  }
};

const getPhotosFromDestination = async (req, res) => {
  try {
    const destination = req.headers['destination']
    const photos = await findPhotos(destination);
    res.json(photos);
  } catch (e) {
    //response error
    res.status(400).json({ error: `${e.message}` });
  }
}

const purchaseTrip = async (req, res) => {
  try {
    const { user_id, trip_id, capacity } = req.body;
    if (!user_id || !trip_id)
      throw new Error("Faltan datos del viaje o del usuario");
    const canBuy = await isFitToBuy(user_id, trip_id);
    if (!canBuy)
      return res
        .status(401)
        .json({ error: "No estas autorizado para comprar este viaje" });
    //vincular viaje
    const trip = await assingTrip({ user_id, trip_id, capacity });
    res.json({ trip_purchased: trip });
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
};

const restorePurchase = async (req, res) => {
  try {
    const {user_id, trip_id} = req.headers;
    console.log(user_id, 'TRIP', trip_id)
    if (!user_id || !trip_id)
      throw new Error("Faltan datos del viaje o del usuario");
    
    const trip = await findTripById({trip_id, model:true})
    let capacities = trip.getDataValue('capacities')
    let users = trip.getDataValue('users')
    let number = 0
    for (const user of users) {
      if(user.getDataValue('user_id') === user_id){
          await user.removeTrip(trip)
          for (const capacity of capacities) {
            if(capacity.getDataValue('user_id') === user_id){
                number = capacity.getDataValue('number')
                await trip.removeCapacity(capacity)
                break;
            }
          }
          if(number !== 0){
            break;
          }
        }
    }
    
    await trip.update({capacity: trip.getDataValue('capacity') + number, isAvailable: true})
    await trip.save()

    res.json({ trip_restored: trip });
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

//---------------------TODO LO DE ABAJO ES PARA RESEÑAS------------------------
const reviewTrip = async (req, res) => {
  try {
    const { user_id, trip_id, review } = req.body
    const trip = await createReview({ user_id, trip_id, review })
    res.json({ trip_reviewed: trip })
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}


const getTripReview = async (req, res) => { //no lo estoy usando pero lo dejo acá por si acaso
  try {
    let user_id = req.headers['user_id']
    let trip_id = req.headers['trip_id']
    const new_review = await findReview(user_id, trip_id)
    res.json(new_review)
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const getAllTripsReviews = async (req, res) => {
  try {
    let user_id = req.headers['user_id']
    const allReviews = await findAllReviews(user_id)
    res.json(allReviews)
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const updateReviewTrip = async (req, res) => {
  try {
    const { user_id, trip_id, review } = req.body
    const new_review = await updateReview({ trip_id, user_id, review })
    res.json({ new_review })
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const updateGeneralTripReview = async (req, res) => {
  try {
    const { trip_id } = req.body
    const trip = await findTripById({ trip_id, model: true })
    let reviews = JSON.parse(JSON.stringify(trip.getDataValue('reviews'), null, 2)) //obtengo reviews y lo paso a obj, con getDataValue porque trip es un objeto
    let sumOfRatings = reviews[0].rating //inicio la suma de Ratings con la primer review porque puede ser la unica
    if (reviews.length > 1) {
      const initialValue = 0;
      sumOfRatings = reviews.reduce((previousValue, currentValue) => previousValue + currentValue.rating,
        initialValue
      );
    }
    trip.update({ rating: (sumOfRatings / reviews.length).toFixed(1) }) //actualizo el rating del viaje
    trip.save()
    res.json(trip)
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const updateDriverReview = async (req, res) => {
  try {
    const { driver_id } = req.body
    const driver = await findDriverById({ driver_id, model: true })
    const [newRating, amountReviews] = await updateDriverRating({ driver })
    await driver.update({ rating: newRating, amountReviews })
    await driver.save()
    res.json(driver)
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

module.exports = {
  // tripHistory,
  postTrip,
  getTrips,
  getTripById,
  purchaseTrip,
  restorePurchase,
  reviewTrip,
  updateReviewTrip,
  updateGeneralTripReview,
  updateDriverReview,
  getTripReview,
  getAllTripsReviews,
  getPhotosFromDestination
};
