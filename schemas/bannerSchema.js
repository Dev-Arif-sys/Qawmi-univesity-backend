const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerEngSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  SubTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const bannerBngSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  SubTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = { bannerEngSchema, bannerBngSchema };
