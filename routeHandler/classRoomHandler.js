const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createClassRoom,
  getAllClassRoom,
  classRoomUpdate,
} = require('../controllers/classRoomController');
const router = express.Router();

router.route('/').post(createClassRoom).get(getAllClassRoom);

router.route('/:classRoomId').put(classRoomUpdate);
module.exports = router;
