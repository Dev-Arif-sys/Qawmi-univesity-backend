const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertPricing,
  getAllPricing,
  updatePricing,
  getSinglePricing,
} = require("../controllers/PricingController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.post("/createPricing", insertPricing);
router.get("/getPricing", getAllPricing);
router.get("/getPricing/:pricingId", getSinglePricing);
router.put("/getPricing/:pricingId", updatePricing);

module.exports = router;
