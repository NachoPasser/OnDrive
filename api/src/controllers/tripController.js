const { createTripAsDriver, createReview, updateReview } = require("../Models/utils/Creations");
const { findAllTrips, findTripById, findReview, findAllReviews} = require("../Models/utils/Finders");

const postTrip = async (req, res) => {
  try {
    const { user_id, trip } = req.body;
    const publishedTrip = await createTripAsDriver(user_id, trip);
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

//---------------------TODO LO DE ABAJO ES PARA RESEÑAS------------------------
const reviewTrip = async (req, res) => {
  try{
    const {user_id, trip_id, review} = req.body
    const trip = await createReview({user_id, trip_id, review})
    res.json({trip_reviewed: trip})
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}


const getTripReview = async (req, res) => { //no lo estoy usando pero lo dejo acá por si acaso
  try{
    let user_id = req.headers['user_id']
    let trip_id = req.headers['trip_id']
    const new_review = await findReview(user_id, trip_id)
    res.json(new_review)
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const getAllTripsReviews = async(req, res) => {
  try{
    let user_id = req.headers['user_id']
    const allReviews = await findAllReviews(user_id)
    res.json(allReviews)
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const updateReviewTrip = async (req, res) => {
  try{
    const {user_id, trip_id, review} = req.body
    const new_review = await updateReview({trip_id, user_id, review})
    res.json({new_review})
  } catch (e) {
    res.status(400).json({ error: `${e.message}` });
  }
}

const updateGeneralTripReview = async (req, res) => {
  try{
    const {trip_id} = req.body
    const trip = await findTripById({trip_id, model:true})
    let reviews = JSON.parse(JSON.stringify(trip.getDataValue('reviews'), null, 2)) //obtengo reviews y lo paso a obj, con getDataValue porque trip es un objeto
    let sumOfRatings = reviews[0].rating //inicio la suma de Ratings con la primer review porque puede ser la unica
    if(reviews.length > 1){
      const initialValue = 0;
      sumOfRatings = reviews.reduce((previousValue, currentValue) => previousValue + currentValue.rating,
        initialValue
      );
    }
    trip.update({rating: sumOfRatings/reviews.length}) //actualizo el rating del viaje
    trip.save()
    res.json(trip)
  } catch(e){
    res.status(400).json({ error: `${e.message}` });
  }
}

// const tripHistory = async (req, res) => {
//   let existTrip = await Trip.findAll()
//     .then((data) => {
//       return data.map((trip) => {
//         return {
//           id: trip.trip_id,
//           start_date: trip.start_date,
//           finish_date: trip.finish_date,
//           origin: trip.origin,
//           destination: trip.destination,
//           price: trip.price,
//         };
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   let response = [...existTrip];
//   response = response.filter((trip) => trip.trip_id == req.params.id);

//   if (response.length > 0) res.json(response);
//   else res.status(404).json({ message: "Trip not found" });
// };

module.exports = {
  // tripHistory,
  postTrip,
  getTrips,
  getTripById,
  reviewTrip,
  updateReviewTrip,
  updateGeneralTripReview,
  getTripReview,
  getAllTripsReviews
};
