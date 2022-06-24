const asyncHandler = require("express-async-handler");
const classRoomSchema = require("../schemas/classRoomSchema");
const mongoose = require("mongoose");
const ClassRoom = new mongoose.model("ClassRoom", classRoomSchema);

const createClassRoom = asyncHandler(async (req, res) => {
  try {
    const newClassRoom = await ClassRoom.create({ ...req.body });

    console.log(req.body);
    console.log(newClassRoom);

    res.status(200).json({
      success: true,
      message: "ClassRoom has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "opps ! something went wrong, please try again",
    });
  }
});

const getAllClassRoom = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({});

    res.status(201).json({
      success: true,
      data: classRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "OPPS ! can't get user data, please contact with author",
    });
  }
});

module.exports = { createClassRoom, getAllClassRoom };
