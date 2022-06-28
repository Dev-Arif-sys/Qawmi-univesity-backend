const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Blog = require("../schemas/blogsSchema");

// Post Blog

const insertBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed Blog Insert",
    });
  }
});

// Get All Blog

const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getAllBlogData = await Blog.find({});
    res.status(200).json(getAllBlogData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting All Blog",
    });
  }
});

// Get Single Blog

const getSingleBlog = asyncHandler(async (req, res) => {
  try {
    const getSingleBlogData = await Blog.findById(req.params.blogId);
    res.status(200).json(getSingleBlogData);
  } catch (error) {
    res.status(500).json({
      message: "Failed Getting Single Blog",
    });
  }
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.blogId);
    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json({
      message: "Failed Deleting Blog",
    });
  }
});

module.exports = { insertBlog, getAllBlog, getSingleBlog, deleteBlog };
