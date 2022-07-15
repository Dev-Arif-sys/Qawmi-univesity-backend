const mongoose = require("mongoose");
const allFeedBackSchema = mongoose.Schema({
  userFeedBack: [
    {
      userName: String,
      userEmail: String,
      userFeedback: String,
      phoneNumber: String,
    },
  ],

  studentFeedBack: [
    {
      studentChoiceCategory: String,
      studentFeedBack: String,
    },
  ],
  classroomFeedBack: [
    {
      concentrationChoiceOption: String,
      punctualChoiceOption: String,
      studentFeedbackChoiceOption: String,
      punctualChoiceOption: String,
      presentChoiceOption: String,
      absentChoiceOption: String,
      marks: Number,
    },
  ],
});

module.exports = mongoose.model("AllFeedback", allFeedBackSchema);
