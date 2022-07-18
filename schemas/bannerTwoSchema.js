const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerTwoEngSchema = mongoose.Schema({
  headingText: {
    type: String,
    required: true,
  },
  Text1: {
    type: String,
    required: true,
  },
  Text2: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const bannerTwoBngSchema = mongoose.Schema({
  headingText: {
    type: String,
    required: true,
  },
  Text1: {
    type: String,
    required: true,
  },
  Text2: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = { bannerTwoEngSchema, bannerTwoBngSchema };
