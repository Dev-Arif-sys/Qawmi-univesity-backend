const asyncHandler = require('express-async-handler');
const bookSchema = require('../schemas/bookSchema');
const mongoose = require('mongoose');
const Book = new mongoose.model('Book', bookSchema);

const createbook = asyncHandler(async (req, res) => {
  try {
    const newbook = await Book.create({
      ...req.body,
    });
    // await newbook.save();
    console.log(req.body.author);
    console.log(newbook);
    res.status(200).json({
      success: true,
      message: 'book created Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'something wrong, cannot create book',
    });
  }
});

const getAllbook = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({});

    res.status(201).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: 'Something error, can not get user data',
    });
  }
});

module.exports = { createbook, getAllbook };
