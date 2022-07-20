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
const classRoomUpdate = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const c_id = req.params.classRoomId;
    const Classtiem = await ClassRoom.findOne({ c_id });
    console.log(Classtiem);
    const data = await ClassRoom.updateOne(
      { _id: c_id },
      {
        $set: {
          video: [{ ...req.body }, ...Classtiem.video],
        },
      }
      // {
      //   $set: {
      //     ...req.body.data,
      //     // ...req.body.data,
      //   },
      // }
    );
    console.log(data);
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get  data",
    });
  }
});

const getClassRoomTeacher = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({
      assignedTeacher: { $all: [req.params.email] },
    });
    console.log(classRoom, req.params.email);
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

const getClassRoomStudent = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({
      accessedStudent: { $all: [req.params.email] },
    });
    console.log(classRoom, req.params.email);
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

// Get Single classRoom

const getSingleclassRoom = asyncHandler(async (req, res) => {
  console.log(req.params.classRoomemail);
  try {
    const getSingleclassRoomData = await ClassRoom.find({
      accessedStudent: { $in: [req.params.classRoomemail] },
    });
    // const getSingleclassRoomData = await classRoom.find({
    //   assignedStudentEmail: [req.params.classRoomemail],
    // });
    console.log(getSingleclassRoomData);
    // findById(
    //   req.params.classRoomemail
    // );
    res.status(200).json(getSingleclassRoomData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single classRoom",
    });
  }
});

// get single classroom by id
const getSingleClassRoomById = asyncHandler(async (req, res) => {
  try {
    const singleClasssRoom = await ClassRoom.findById(req.params.classRoomId);
    res.status(200).json(singleClasssRoom);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single Classroom by id",
    });
  }
});

module.exports = {
  getSingleclassRoom,
  createClassRoom,
  getAllClassRoom,
  getClassRoomTeacher,
  getClassRoomStudent,
  classRoomUpdate,
  getSingleClassRoomById,
};
