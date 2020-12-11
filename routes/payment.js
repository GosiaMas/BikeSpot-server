const express = require("express");
const router = express();

const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")(
  "sk_test_51Hx6DnCeJH0vCsE1j7rBAu25pSxFQSo2LdFiLFHrnfenxI3XXqXigRVhSuEuPtoAtouyeBdulMYk49JpZySrpUth00LrrTY7co"
);
router.use(express.static("."));
router.use(express.json());

router.post("/create-payment-intent", async (req, res) => {
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1500;
  };

  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// router.listen(4242, () => console.log("Node server listening on port 4242!"));
module.exports = router;
