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
  classes:Array,
  video: [
    {
      videoTitle: String,
      email: String,
      name: String,
      videoId: String,
     
    },
  ],
  classNote: [
    {
      title: String,
      note: String,
      date: String
    }
  ]
  // video: {
  //   type: Array,
  //   required: [true, 'Please provide Tag of the book'],
  // },
});

module.exports = classRoomSchema;
