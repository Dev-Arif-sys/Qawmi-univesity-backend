const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationsSchema = mongoose.Schema({
  notify: {
    type: String,
    required: true,
  },
  assignedTeacherEmail: {
    type: Array,
    required: [true, 'Please provide Tag of the book'],
  },
  assignedStudentEmail: {
    type: Array,
    required: [true, 'Please provide Tag of the book'],
  },
});

module.exports = notificationsSchema;
