const router = require("express").Router();
const authRoutes = require("./auth");
const spotRoutes = require("./spot");
const paymentRoutes = require("./payment.js");
//const profileRoutes = require("./profile");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
// router.use("/profile", profileRoutes);
router.use("/spots", spotRoutes);
router.use("/payment/:id", paymentRoutes);

module.exports = router;
