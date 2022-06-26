const asyncHandler = require("express-async-handler");
const assignmentSchema = require("../schemas/assignmentSchema");
const mongoose = require("mongoose");
const AssignmentSchema = new mongoose.model("AssignmentSchema", assignmentSchema);
/* Post */
const createAssignment = asyncHandler(async (req, res) => {
  try {
    const newAssignment = await AssignmentSchema.create({ ...req.body });

    console.log(req.body);
    console.log(newAssignment);

    res.status(200).json({
      success: true,
      message: "Assignment has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});
/* get all */
const getAllAssignment = asyncHandler(async (req, res) => {
  try {
    const assignment = await AssignmentSchema.find({});

    res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

/* delete */
const deleteAssignment = asyncHandler(async (req, res) => {
  try {
    const data = await AssignmentSchema.deleteOne({ _id: req.params.id });
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

module.exports = { createAssignment, getAllAssignment, deleteAssignment };
