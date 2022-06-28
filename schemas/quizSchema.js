const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = mongoose.Schema({
  classRoomId: String,
  deadline: String,
  quiz:[
    {
    question: String,
    choices: Array,
    answer: String,
  }
 ]
});

module.exports = quizSchema;