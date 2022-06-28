const express = require('express');
const { default: mongoose } = require('mongoose');
const { createAssignment, getAllAssignment, deleteAssignment } = require('../controllers/assignmentController');
const router = express.Router();

router.route('/').post(createAssignment).get(getAllAssignment).delete(deleteAssignment);

module.exports = router;