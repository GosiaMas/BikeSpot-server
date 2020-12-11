const router = require("express").Router();
const Spot = require("../models/Spot");

router.get("/", (req, res, next) => {
  Spot.find().then((allSpots) => {
    res.json(allSpots);
    console.log(allSpots);
  });
});

// router.get("/:id", (req, res) => {});

module.exports = router;
