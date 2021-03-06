const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertReview,
  getAllReview,
  getSingleReview,
  deleteReview,
} = require("../controllers/testimonialReviewController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.post("/createReview", insertReview);
router.get("/getReview", getAllReview);
router.get("/getReview/:reviewId", getSingleReview);
router.delete("/getReview/:reviewId", deleteReview);

module.exports = router;
