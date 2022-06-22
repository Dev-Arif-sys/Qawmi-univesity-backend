const asyncHandler = require("express-async-handler");
const categorySchema = require("../schemas/categorySchema");
const mongoose = require("mongoose");
const Category = new mongoose.model("Category", categorySchema);
/* Post */
const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create({ ...req.body });
    res.status(200).json({
      success: true,
      message: "category has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllCategory = asyncHandler(async (req, res) => {
    try {
      const category = await Category.find({});
  
      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        error: "OPPS ! can't get cat data, please contact with author",
      });
    }
  });

module.exports = { createCategory, getAllCategory };