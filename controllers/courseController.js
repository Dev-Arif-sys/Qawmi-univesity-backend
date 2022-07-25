const asyncHandler = require("express-async-handler");
const courseSchema = require("../schemas/courseSchema");
const mongoose = require("mongoose");
const Course = new mongoose.model("Course", courseSchema);
const ObjectId = require("mongodb").ObjectId;

const createCourse = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newCourse = await Course.create({
      ...req.body,
    });

    res.status(200).json({
      success: true,
      message: "Course created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "something wrong, cannot create course",
    });
  }
});

const getAllCourse = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({}).select([
      "_id",
      "title",
      "image",
      "lesson",
      "durationHr",
      "level",
      "price",
      "salePrice",
      "rating",
      "teacherInfo"
    ]);

    res.status(201).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const courseUpdate = asyncHandler(async (req, res) => {
  try {
    const c_id = req.body.id;
    console.log(req.body)
    const data = await Course.findOneAndUpdate(
      { _id: c_id },
      {
        $set: {
          ...req.body,
        },
      }
    );

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

// get single course

const getSingleCourse = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: ObjectId(id) }).select({
      "curriculum.lessons.quizes": 0,
      "curriculum.lessons.video": 0,
      "curriculum.lessons.note": 0,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

//get single course for student
const getSingleCourseforStudent = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: ObjectId(id) }).select( [
      "_id",
      "title",
     "curriculum"
    ])

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});


const getSingleForAdmin = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ _id: ObjectId(id) })

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

// get many course by filter

const getManyByFilter = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const courses = await Course.find({ "_id": { $in: req.body.courseId.map(id=>mongoose.Types.ObjectId(id.trim())) } }).select(
      [
        "_id",
        "title",
        "image",
        "lesson",
        "durationHr",
        "level",
        "price",
        "salePrice",
        "rating",
      ]
    );
console.log(courses)
    res.status(201).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});







module.exports = {
  createCourse,
  getAllCourse,
  courseUpdate,
  getSingleCourse,
  getManyByFilter,
  getSingleCourseforStudent,
  getSingleForAdmin
};
