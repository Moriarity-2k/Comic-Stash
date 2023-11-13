const express = require("express");
const { protect } = require("../controller/authController");
const { getCheckoutSession } = require("../controller/bookingsController");

const router = express.Router();

router.use(protect);

router.post("/create-checkout-session", protect, getCheckoutSession);

module.exports = router;
