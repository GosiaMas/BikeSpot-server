const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const User = require("../models/User.model");
const Spot = require("../models/Spot");
const Transaction = require("../models/Transaction");

router.delete("/delete/:id", isLoggedIn, (req, res) => {
  //   console.log(req.params);
  const { id } = req.params;
  if (id !== req.user._id.toString()) {
    //you are trying to dewlete someone elses account
    return res.json("You are not authorised to delete this user");
  }

  User.findByIdAndDelete(id).then((deleteInfo) => {
    console.log(deleteInfo);
    res.json({ message: "User deleted" });
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
      console.log(allTrans[0]);
      res.json({ allTrans });
    });
});

module.exports = router;
