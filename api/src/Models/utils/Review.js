const { models } = require("../../database/relations");
const { findReview } = require("./Finders");
//models
const { User, Trip, Driver, Review } = models;

async function createReview({user_id = null, trip_id = null, review = {}}){
    try {
      if (!trip_id || !user_id) throw new Error("trip id or user id missing");
  
      if (!review || typeof review !== "object")
        throw new Error(`review missing properties`);
      
      const trip = await Trip.findByPk(trip_id)
      if (!trip) throw new Error("trip id invalid or does not exist");
      const reviewCreated = await Review.create({user_id, trip_id, rating: review.rating, comment: review.comment}, {include: [{model: Trip}, {model:User}]})
      await trip.addReview(reviewCreated)
      return JSON.parse(JSON.stringify(trip, null, 2))
    } catch (e) {
      throw new Error(`${e.message}`);
    }
}
  
async function updateReview({trip_id = null, user_id = null, review = {}}){
    try {
      if (!user_id || !trip_id) throw new Error("trip id or user id missing");
  
      if (!review || typeof review !== "object")
        throw new Error(`review missing properties`);
      
      const reviewCreated = await findReview(user_id, trip_id, true)
      reviewCreated.update({rating: review.rating, comment: review.comment})
      reviewCreated.save()
      // await trip.addReview(reviewCreated)
      return JSON.parse(JSON.stringify(reviewCreated, null, 2))
    } catch (e) {
      throw new Error(`${e.message}`);
    }
}

async function updateDriverRating({driver = null}){
    try {
      if (!driver) throw new Error("driver missing");
      let rating = 0;
      let reviews = 0;
      console.log(driver)
      for (const trip of driver.trips) { //recorro los viajes en los que el usuario conducio
            if(trip.rating !== 0){ //si el viaje tiene un rating
            rating += trip.rating //lo sumo a la suma total
            reviews++; //sumo +1 a la cantidad de reviews
            }
      }
      return (rating / reviews).toFixed(1)
    } catch (e) {
      throw new Error(`${e.message}`);
    }
}

module.exports = {
    createReview,
    updateReview,
    updateDriverRating
}