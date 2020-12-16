const express = require("express");
const router = express();
// const mongoose = require("mongoose");
// require("../db/index.js");

const { resolve } = require("path");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Spot = require("../models/Spot");
const Transaction = require("../models/Transaction");
// This is your real test secret API key.
const stripe = require("stripe")(
  "sk_test_51Hx6DnCeJH0vCsE1j7rBAu25pSxFQSo2LdFiLFHrnfenxI3XXqXigRVhSuEuPtoAtouyeBdulMYk49JpZySrpUth00LrrTY7co"
);
router.use(express.static("."));
router.use(express.json());

router.post("/:id/create-payment-intent", isLoggedIn, async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1500,
    currency: "eur",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//here we need to update DB Spot with user ID and create a transaction on Transaction model with User ID, spot ID and ammount

router.post("/success", isLoggedIn, (req, res) => {
  Transaction.create({
    transSpot: req.body.transSpot,
    transUser: req.user._id,
    ammount: 15.0,
  }).then(() => {
    // console.log("THIS ONE", reg.body.transSpot);
    Spot.findByIdAndUpdate(req.body.transSpot, {
      userBooking: req.user._id,
      $inc: { vacantSpaces: -1 },
    }).then(() => {
      res.json("all good");
    });
  });
});
// router.listen(4242, () => console.log("Node server listening on port 4242!"));
module.exports = router;
