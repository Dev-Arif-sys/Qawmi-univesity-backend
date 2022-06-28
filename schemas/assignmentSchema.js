const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = mongoose.Schema({

  courseId: String,

  assignmentType: String,

  questionPaper: String,

  totalMark: Number,

  passMark: Number,

  deadline: String,
  
  file: String,

});

module.exports = assignmentSchema;