const mongoose = require("mongoose");
const allFeedBackSchema = mongoose.Schema({
  userFeedBack: Array,
  studentFeedBack: Array,
  classroomFeedBack: Array,
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("AllFeedback", allFeedBackSchema);
