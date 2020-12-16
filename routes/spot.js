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
    }.then(() => {
      Spot.findByIdAndUpdate(req.body.newSpotId.selectedSpotId),
        {
          userBooking: userBooking.push(req.body.newSpotId.selectedSpotId),
          vacantSpaces: Number(vacantSpaces)--,
        }.then(() => {
          Transaction.findByIdandUpdate(req.user._id),
            {
              transSpot: transSpot.splice(indexOf(req.params.id), 1),
            }.then(() => {
              Transaction.findByIdandUpdate(req.body.newSpotId.selectedSpotId),
                {
                  transSpot: transSpot.push(req.body.newSpotId.selectedSpotId),
                };
            });
        });
    });
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
