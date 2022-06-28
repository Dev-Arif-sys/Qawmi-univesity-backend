const express = require('express');
const { default: mongoose } = require('mongoose');
const { createClassRoom, getAllClassRoom, getClassRoomTeacher, getClassRoomStudent, classRoomUpdate} = require('../controllers/classRoomController');

const router = express.Router();

router.route('/').post(createClassRoom).get(getAllClassRoom);
router.route('/teacher/:email').get(getClassRoomTeacher)
router.route('/student/:email').get(getClassRoomStudent)
router.route('/:classRoomId').put(classRoomUpdate);


module.exports = router;
