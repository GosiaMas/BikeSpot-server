const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const User = require("../models/User.model");
const Spot = require("../models/Spot");
const Transaction = require("../models/Transaction");
const qr = require("qrcode");

router.delete("/delete/:id", isLoggedIn, (req, res) => {
  //   console.log(req.params);
  const { id } = req.params;
  if (id !== req.user._id.toString()) {
    //you are trying to dewlete someone elses account
    return res.json("You are not authorised to delete this user");
  }
  User.findByIdAndDelete(id).then(() => {
    Spot.findOneAndUpdate(
      { userBooking: { $in: id } },
      { $inc: { vacantSpaces: 1 } }
    ).then((deleteInfo) => {
      // console.log(deleteInfo);
      res.json({ message: "User deleted" });
    });
  });
});

router.get("/", isLoggedIn, (req, res) => {
  //console.log("Profile user", req.user);
  //   res.json(true);
  const { _id } = req.user;
  Transaction.find({
    transUser: _id,
  })
    .populate("transSpot")
    .then((allTrans) => {
      //   console.log(allTrans[0]);
      res.json({ allTrans });
    });
});

// catch below sent QR code info
router.get("/QRcode/:id", isLoggedIn, (req, res) => {
  //to get spot ID from link:
  // console.log(req.params.id);
  //to get user ID from headers:
  //console.log(req.user.password);

  const text = req.params.id;
  qr.toDataURL(text, (error, url) => {
    //console.log(url);
    if (error) {
      res.json({ message: "Error occured" });
    }
    //console.log(url);
    res.json({ url });
  });
});

module.exports = router;
