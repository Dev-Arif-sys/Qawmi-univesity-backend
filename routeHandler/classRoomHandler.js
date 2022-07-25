const express = require("express");
const { default: mongoose } = require("mongoose");
const {
  createClassRoom,
  getAllClassRoom,
  getClassRoomTeacher,
  getClassRoomStudent,
  classRoomUpdate,
  getSingleClassroom,
  pushClassNote,
  getClassNote,
  deleteClassNote,
  getAccessedStudents,
} = require("../controllers/classRoomController");

const router = express.Router();

router.route("/").post(createClassRoom).get(getAllClassRoom);
router.route("/teacher/:email").get(getClassRoomTeacher);
router.route("/student/:email").get(getClassRoomStudent);
router.route("/:classRoomId").put(classRoomUpdate);
router.route("/single/:classRoomId").get(getSingleClassroom);
router.route("/classNote/:classRoomId").put(pushClassNote).get(getClassNote);
router.route('/classNote/:id').put(deleteClassNote)
router.route('/accessedStudent/:classRoomId').get(getAccessedStudents)

module.exports = router;
