const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Feedback = require("../schemas/allFeedbackSchema");

// post pricing
const classRoomFeedback = asyncHandler(async (req, res) => {
  try {
    let classRoomFeedbackData = {
      concentrationChoiceOption: req.body.concentration,
      punctualChoiceOption: req.body.punctual,
      studentFeedbackChoiceOption: req.body.studentFeedback,
      presentChoiceOption: req.body.present,
      absentChoiceOption: req.body.absent,
      marks: req.body.marks,
    };

    const data = await Feedback.find({}).select("classRoomFeedbackData");
    data.classRoomFeedbackData.push(classRoomFeedbackData);
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

// Get Al

const getAllFeedback = asyncHandler(async (req, res) => {
  try {
    const getAllFeedbackData = await Feedback.find({});
    res.status(200).json(getAllFeedbackData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All Feedback",
    });
  }
});

module.exports = { classRoomFeedback, getAllFeedback };
