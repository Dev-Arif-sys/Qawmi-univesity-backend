const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Review = require("../schemas/testimonialReviewSchema");

// Post Review

const insertReview = asyncHandler(async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json({
      message: "Failed Review Insert",
    });
  }
});

// Get All Review

const getAllReview = asyncHandler(async (req, res) => {
  try {
    const getAllReviewData = await Review.find({});
    res.status(200).json(getAllReviewData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All Review",
    });
  }
});

// Get Single Review

const getSingleReview = asyncHandler(async (req, res) => {
  try {
    const getSingleReviewData = await Review.findById(req.params.reviewId);
    res.status(200).json(getSingleReviewData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single Review",
    });
  }
});

// Delete Review
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndDelete(req.params.reviewId);
    res.status(200).json(deleteReview);
  } catch (error) {
    res.status(500).json({
      message: "Failed Deleting Review",
    });
  }
});

module.exports = { insertReview, getAllReview, getSingleReview, deleteReview };
