const express = require('express');
const { default: mongoose } = require('mongoose');
const { createClassRoom, getAllClassRoom, getClassRoomTeacher, getClassRoomStudent, classRoomUpdate, getSingleclassRoom} = require('../controllers/classRoomController');

const router = express.Router();

router.route('/').post(createClassRoom).get(getAllClassRoom);
router.route('/teacher/:email').get(getClassRoomTeacher)
router.route('/student/:email').get(getClassRoomStudent)
router.route('/:classRoomId').put(classRoomUpdate);
router.route('/student/:classRoomemail').get(getSingleclassRoom);

module.exports = router;
