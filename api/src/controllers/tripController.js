const { Trip } = require("../Models/Trip");

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

const postTrip = async (req, res) => {
  await Trip.create(req.body);
  res.send("create trip");
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

module.exports = {
  tripHistory,
  postTrip,
  getTrips,
};
