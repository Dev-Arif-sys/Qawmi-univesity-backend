const express = require('express');
const { default: mongoose } = require('mongoose');
const { createClassRoom, getAllClassRoom } = require('../controllers/classRoomController');
const router = express.Router();

router.route('/').post(createClassRoom).get(getAllClassRoom);

module.exports = router;