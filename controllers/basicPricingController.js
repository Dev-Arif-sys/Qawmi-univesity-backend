const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const BasicPricing = require("../schemas/basicPricingAddSchema");

// Post BasicPricing

const insertBasicPricing = asyncHandler(async (req, res) => {
  try {
    const newBasicPricing = new BasicPricing(req.body);
    const savedBasicPricing = await newBasicPricing.save();
    res.status(200).json(savedBasicPricing);
  } catch (error) {
    res.status(500).json({
      message: "Failed BasicPricing Insert",
    });
  }
});

// Get All BasicPricing

const getAllBasicPricing = asyncHandler(async (req, res) => {
  try {
    const getAllBasicPricingData = await BasicPricing.find({});
    res.status(200).json(getAllBasicPricingData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All BasicPricing",
    });
  }
});

// Get Single BasicPricing

const getSingleBasicPricing = asyncHandler(async (req, res) => {
  try {
    const getSingleBasicPricingData = await BasicPricing.findById(
      req.params.BasicPricingId
    );
    res.status(200).json(getSingleBasicPricingData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single BasicPricing",
    });
  }
});

// Delete BasicPricing
const deleteBasicPricing = asyncHandler(async (req, res) => {
  try {
    const deleteBasicPricing = await BasicPricing.findByIdAndDelete(
      req.params.BasicPricingId
    );
    res.status(200).json(deleteBasicPricing);
  } catch (error) {
    res.status(500).json({
      message: "Failed Deleting BasicPricing",
    });
  }
});

module.exports = {
  insertBasicPricing,
  getAllBasicPricing,
  getSingleBasicPricing,
  deleteBasicPricing,
};
