const express = require('express');
const { default: mongoose } = require('mongoose');
<<<<<<< HEAD
const { createClassRoom, getAllClassRoom, getClassRoomTeacher, getClassRoomStudent } = require('../controllers/classRoomController');
=======
const {
  createClassRoom,
  getAllClassRoom,
  classRoomUpdate,
} = require('../controllers/classRoomController');
>>>>>>> 2476bb446208fddcba5e488d652a418bdef471ce
const router = express.Router();

router.route('/').post(createClassRoom).get(getAllClassRoom);
router.route('/teacher/:email').get(getClassRoomTeacher)
router.route('/student/:email').get(getClassRoomStudent)

router.route('/:classRoomId').put(classRoomUpdate);
module.exports = router;
