const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const config = require("../config/config");
const Blog = require("../schemas/blogsSchema");

// digital ocean connnection
const spaces = new AWS.S3({
  endpoint: new AWS.Endpoint(config.spaces.url),
  accessKeyId: config.spaces.accessKeyId,
  secretAccessKey: config.spaces.secretAccessKey,
});

// Post Blog

const insertBlog = asyncHandler(async (req, res) => {
  const { file } = req.files;
  try {
    await spaces
      .putObject({
        ACL: "public-read",
        Bucket: config.spaces.blogSpace,
        Body: file.data,
        Key: file.name,
      })
      .promise();
    const blogImgUrl = `https://${config.spaces.blogSpace}.${config.spaces.url}/${file.name}`;
    const blogData = new Blog({
      blogImg: blogImgUrl,
      key: file.name,
      blogTitle: req?.body?.blogTitle,
      blogAuthorName: req?.body?.blogAuthorName,
      blogDescription: req?.body?.blogDescription,
      blogTag: req?.body?.blogTag,
      blogCategory: req?.body?.blogCategory,
      publishDate: req?.body?.publishDate,
    });
    await blogData.save();
    return res.status(200).json(blogData);
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
