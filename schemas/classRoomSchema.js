const mongoose = require("mongoose");
const { Schema } = mongoose;

const classRoomSchema = mongoose.Schema({
  // _id: { type: mongoose.Types.ObjectId },

  department: String,

  slogan: String,

  accessedStudent: Array,

  roomNo: String,

  accessedStudent: Array,
  
  image: String,

});

module.exports = classRoomSchema;
