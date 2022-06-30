const express = require('express');
const { default: mongoose } = require('mongoose');
const { createAssignment, getAllAssignment, deleteAssignment,getSingleAssignment } = require('../controllers/assignmentController');
const router = express.Router();

router.route('/').post(createAssignment).get(getAllAssignment).delete(deleteAssignment);
router.route('/:classRoomId').get(getSingleAssignment)

module.exports = router;