const router = require("express").Router();
const Spot = require("../models/Spot");
const isLoggedIn = require("../middlewares/isLoggedIn");
router.get("/", (req, res, next) => {
  Spot.find().then((allSpots) => {
    res.json(allSpots);
    // console.log(allSpots);
  });
});
router.post("/:id", isLoggedIn, (req, res) => {
  console.log("old Spot", req.params.id);
  console.log("newSpot", req.body.newSpotId.selectedSpotId);
  console.log("user", req.user._id);
  // });
  const oldSpotId = req.params.id;
  const newSpotId = req.body.newSpotId.selectedSpotId;
  const userId = req.user._id;
  Spot.findByIdAndUpdate(oldSpotId, {
    $pull: { userBooking: userId },
    $inc: { vacantSpaces: 1 },
  }).then(() => {
    Spot.findByIdAndUpdate(newSpotId, {
      $addToSet: { userBooking: userId },
      $inc: { vacantSpaces: -1 },
    }).then(() => res.json("successChanging"));
  });
});
module.exports = router;
