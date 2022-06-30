const asyncHandler = require('express-async-handler');
const classRoomSchema = require('../schemas/classRoomSchema');
const mongoose = require('mongoose');
const ClassRoom = new mongoose.model('ClassRoom', classRoomSchema);

const createClassRoom = asyncHandler(async (req, res) => {
  try {
    const newClassRoom = await ClassRoom.create({ ...req.body });

    console.log(req.body);
    console.log(newClassRoom);

    res.status(200).json({
      success: true,
      message: 'ClassRoom has been created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'opps ! something went wrong, please try again',
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

const getSingleClassroom=asyncHandler(async (req, res) => {
 
  try {
    const c_id = req.params.classRoomId;
    const data = await ClassRoom.findOne({ c_id });
    

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 'Something error, can not get  data',
    });
  }
});
const classRoomUpdate = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const c_id = req.params.classRoomId;
    const classItem = await ClassRoom.findOne({ c_id });
   console.log(classItem)
    const data = await ClassRoom.updateOne(
      { _id: c_id },
      {
        $set: {
          video: [{ ...req.body }, ...classItem.video],
          classes:[{...req.body.class}, ...classItem.classes],
          ...req.body
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
    res.status(501).json({
      error: 'Something error, can not get  data',
    });
  }
});

const getClassRoomTeacher = asyncHandler(async (req, res) => {
  try {
    const classRoom = await ClassRoom.find({assignedTeacher:{ $all: [req.params.email]}});
    console.log(classRoom,req.params.email)
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
    const classRoom = await ClassRoom.find({accessedStudent:{ $all: [req.params.email]}});
    console.log(classRoom,req.params.email)
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


module.exports = { createClassRoom, getAllClassRoom, getClassRoomTeacher,getClassRoomStudent,classRoomUpdate,getSingleClassroom };

