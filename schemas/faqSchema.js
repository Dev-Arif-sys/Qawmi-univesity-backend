const mongoose = require("mongoose");
const { Schema } = mongoose;

const faqSchema = mongoose.Schema({
  question: String,
  answer: String,
});

module.exports = faqSchema;