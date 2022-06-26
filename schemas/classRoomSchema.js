const mongoose = require("mongoose");
const { Schema } = mongoose;

const classRoomSchema = mongoose.Schema({

  department: String,

  slogan: String,

  subject: String,

  assignedTeacher: Array,

  roomNo: String,

  accessedStudent: Array,
  
  image: String,

});

module.exports = classRoomSchema;
