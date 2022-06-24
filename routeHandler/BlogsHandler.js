const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  insertBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
} = require("../controllers/BlogsController");
const { checkLogin, admin } = require("../middlewares/checkLogin");

// all routes
router.post("/createBlog", insertBlog);
router.get("/getBlog", getAllBlog);
router.get("/getBlog/:blogId", getSingleBlog);
router.delete("/getBlog/:blogId", deleteBlog);

module.exports = router;
