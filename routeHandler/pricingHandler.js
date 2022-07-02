const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getAllPricing,
  updatePricing,
  getSinglePricing,
} = require("../controllers/PricingController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.get("/getPricing", getAllPricing);
router.get("/getPricing/:pricingId", getSinglePricing);
router.patch("/getPricing/:pricingId", updatePricing);

module.exports = router;
