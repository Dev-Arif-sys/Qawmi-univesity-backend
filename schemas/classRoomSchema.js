const mongoose = require('mongoose');
const { Schema } = mongoose;

const classRoomSchema = mongoose.Schema({
  department: String,

  slogan: String,

  subject: String,

  assignedTeacher: Array,

  roomNo: String,

  accessedStudent: Array,

  image: String,
  video: [
    {
      videoTitle: String,
      email: String,
      name: String,
      videoId: String,
    },
  ],
  // video: {
  //   type: Array,
  //   required: [true, 'Please provide Tag of the book'],
  // },
});

module.exports = classRoomSchema;
