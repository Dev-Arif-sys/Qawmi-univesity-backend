const mongoose = require("mongoose");
const blogsSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, "Please provide Blog Title"],
    },
    blogImg: {
      type: String,
      required: [true, "Please provide Blog Image"],
    },
    blogAuthorName: {
      type: String,
      required: [true, "Please provide Blog Author Name"],
    },
    blogDescription: {
      type: String,
      required: [true, "Please provide description of the Blog"],
    },
    blogTag: {
      type: Array,

      required: [true, "Please provide Tag of the Blog"],
    },

    blogCategory: {
      type: String,

      // enum: ["Category1", "Category2", "Category3", "Category4"],
      // default:"Category1",
    },
    publishDate: {
      type: String,
      required: [true, "Please provide publish date of the Blog"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogsSchema);
