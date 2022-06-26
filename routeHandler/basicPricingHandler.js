const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertBasicPricing,
  getAllBasicPricing,
  getSingleBasicPricing,
  deleteBasicPricing,
} = require("../controllers/basicPricingController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.post("/createBasicPricing", insertBasicPricing);
router.get("/getBasicPricing", getAllBasicPricing);
router.get("/getBasicPricing/:BasicPricingId", getSingleBasicPricing);
router.delete("/getBasicPricing/:BasicPricingId", deleteBasicPricing);

module.exports = router;
