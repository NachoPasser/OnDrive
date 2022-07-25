const {
  postTrip,
  getTrips,
  getTripById,
  reviewTrip,
  updateReviewTrip,
  getTripReview,
  getAllTripsReviews,
  updateGeneralTripReview,
  getPhotosFromDestination,
  updateDriverReview
} = require("../controllers/tripController.js");

const { getIdFromToken } = require('../controllers/Middlewares/middleware');
const router = require("express").Router();

// router.get('/:id', tripHistory);
router.get("/:id", getTripById);
router.get("/", getTrips);
router.get('/photo/get', getPhotosFromDestination)
router.post("/", getIdFromToken, postTrip);
router.post('/review', reviewTrip);
router.put('/review', updateReviewTrip);
router.put('/review/driver', updateDriverReview)
router.put('/generalReview', updateGeneralTripReview);
router.get('/review/get', getTripReview) //no lo estoy usando en nada, pero lo dejo acá por si acaso
router.get('/review/getAll', getAllTripsReviews);
module.exports = router;
