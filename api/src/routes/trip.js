const {
  postTrip,
  getTrips,
  getTripById,
  reviewTrip,
  updateReviewTrip,
  getTripReview,
  getAllTripsReviews,
  updateGeneralTripReview
} = require("../controllers/tripController.js");

// const { getTripById } = require("../controllers/usersController.js");
const router = require("express").Router();

// router.get('/:id', tripHistory);
router.get("/:id", getTripById);
router.get("/", getTrips);
router.post("/", postTrip);
router.post('/review', reviewTrip);
router.put('/review', updateReviewTrip);
router.put('/generalReview', updateGeneralTripReview);
router.get('/review/get', getTripReview) //no lo estoy usando en nada, pero lo dejo acá por si acaso
router.get('/review/getAll', getAllTripsReviews);
module.exports = router;
