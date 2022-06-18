const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = mongoose.Schema({
  fileSize: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  interactive: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  salePrice: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  faq: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: [true, 'Please provide Tag of the book'],
  },
  title: {
    type: String,
    required: true,
  },
  author: [
    {
      authorName: {
        type: String,
      },
      authordis: {
        type: String,
      },
      authoredu: {
        type: String,
      },
      authorimg: {
        type: String,
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
});
