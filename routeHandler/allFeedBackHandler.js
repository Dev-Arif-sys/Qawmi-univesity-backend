const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  classRoomFeedback,
  getAllFeedback,
} = require("../controllers/allFeedBackController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.put("/createFeedback", classRoomFeedback);


module.exports = router;
