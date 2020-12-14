const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const User = require("../models/User.model");

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
  console.log("Profile user", req.params);
  const { id } = req.params;

  // Spot.find().then((allSpots)=> {
  // allSpots.filter((spot)=> spot.)
  // })
});

module.exports = router;
