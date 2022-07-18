const { Trip } = require("../Models/Trip");
const { createTripAsDriver } = require("../Models/utils/Creations");

const postTrip = async (req, res) => {
  try {
    const { user_id, trip } = req.body;
    const publishedTrip = await createTripAsDriver(user_id, trip);
    res.status(201).json(publishedTrip);
  } catch (e) {
    res.status(400).json({ error: `Server error: ${e.message}` });
  }
};

const getTrips = async (req, res) => {
  const trips = Trip.findAll({
    where: {
      onCourse: true,
    },
  })
    .then((data) => {
      data = data.map((trip) => {
        return {
          id: trip.trip_id,
          start_date: trip.start_date,
          finish_date: trip.finish_date,
          origin: trip.origin,
          destination: trip.destination,
          price: trip.price,
        };
      });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const tripHistory = async (req, res) => {
  let existTrip = await Trip.findAll()
    .then((data) => {
      return data.map((trip) => {
        return {
          id: trip.trip_id,
          start_date: trip.start_date,
          finish_date: trip.finish_date,
          origin: trip.origin,
          destination: trip.destination,
          price: trip.price,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
  let response = [...existTrip];
  response = response.filter((trip) => trip.trip_id == req.params.id);

  if (response.length > 0) res.json(response);
  else res.status(404).json({ message: "Trip not found" });
};

module.exports = {
  tripHistory,
  postTrip,
  getTrips,
};
