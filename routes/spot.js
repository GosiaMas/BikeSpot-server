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

  // Spot.findByIdAndUpdate(oldSpotId),
  //   {
  //     userBooking: userBooking.splice(indexOf(userId), 1),
  //     vacantSpaces: vacantSpaces++,
  //   }.then(() => {
  //     Spot.findByIdAndUpdate(newSpotId),
  //       {
  //         userBooking: [...userBooking, userId],
  //         vacantSpaces: Number(vacantSpaces)--,
  //       }.
  // then(() => {
  //   Transaction.findByIdandUpdate({
  //     transUser: { $in: ["userId"] },
  //   }),
  //     {
  //       transSpot: transSpot.splice(indexOf(oldSpotId), 1, newSpotId),
  //     }.then(() => res.json("all good"));
  // });
  // });
});

// OLD CODE BELOW!!!!!!
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
