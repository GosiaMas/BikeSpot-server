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
  Spot.findByIdAndUpdate(req.params.id),
    {
      userBooking: userBooking.splice(indexOf(req.user._id), 1),
      vacantSpaces: Number(vacantSpaces)++,
    };

  //userBooking.splice(indexOf(req.user._id), 1)
});

// router.post("/success", isLoggedIn, (req, res) => {
//   Transaction.create({
//     transSpot: req.body.transSpot,
//     transUser: req.user._id,
//     ammount: 15.0,
//   }).then(() => {
//     // console.log("THIS ONE", reg.body.transSpot);
//     Spot.findByIdAndUpdate(req.body.transSpot, {
//       userBooking: req.user._id,
//       // vacantSpaces: Number--,
//     }).then(() => {
//       res.json("all good");
//     });
//   });
// });

module.exports = router;
