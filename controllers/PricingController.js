const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Pricing = require("../schemas/pricingAddSchema");

// post pricing
// const insertPricing = asyncHandler(async (req, res) => {
//   // console.log(req.body);
//   try {
//     // console.log(req.body);
//     const newPricing = await Pricing.create({
//       ...req.body,
//     });
//     // console.log(newPricing?.pricing?.intro);
//     res.status(200).json({
//       pricingData: newPricing.pricing,
//       success: true,
//       message: "pricing created Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "something wrong, cannot create pricing",
//     });
//   }
// });

// Get Single pricing

const getSinglePricing = asyncHandler(async (req, res) => {
  try {
    const getSinglePricingData = await Pricing.findById(req.params.pricingId);
    res.status(200).json(getSinglePricingData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single Review",
    });
  }
});

// Get All Pricing

const getAllPricing = asyncHandler(async (req, res) => {
  try {
    const getAllPricingData = await Pricing.find({});
    res.status(200).json(getAllPricingData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All Pricing",
    });
  }
});

// Update Pricing
const updatePricing = asyncHandler(async (req, res) => {
  try {
    const pricingId = req.params.pricingId;
    // const update = {intro[0].introPricingAmount:20 }
    const data = await Pricing.findByIdAndUpdate(
      { _id: pricingId },
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(req.body);
    res.status(200).json({
      message: "Successfully updated",
      data: data,
    });
    // console.log(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something error, can not update pricing",
    });
  }
});

module.exports = {
  getAllPricing,
  updatePricing,
  getSinglePricing,
};
