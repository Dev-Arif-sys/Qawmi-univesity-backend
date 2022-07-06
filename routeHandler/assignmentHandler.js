const express = require('express');
const { default: mongoose } = require('mongoose');
const { createAssignment, getAllAssignment, deleteAssignment,getSingleAssignment, pushQuestionAnswers,pushQuestionAttendance } = require('../controllers/assignmentController');
const router = express.Router();

router.route('/').post(createAssignment).get(getAllAssignment).delete(deleteAssignment);
router.route('/:classRoomId').get(getSingleAssignment)
router.route('/:id').put(pushQuestionAnswers)
router.route('/nested/:questionId').put(pushQuestionAttendance)

module.exports = router;