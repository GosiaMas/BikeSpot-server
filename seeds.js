const mongoose = require("mongoose");
const Spot = require("./models/Spot");
// require("../configs/db.config.js") do we need this? how we normally call/connect to DB?

const spots = [
  {
    address: "",
    longitude: "",
    latitude: "",
    vacantSpaces: 100,
  },
  {
    address: "",
    longitude: "",
    latitude: "",
    vacantSpaces: 100,
  },
];

Spot.insertMany(spots)
  .then((addedSpots) => {
    console.log(`${addedSpots.length} movies added to DB`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Could not add seed data", err);
    mongoose.connection.close();
  });
