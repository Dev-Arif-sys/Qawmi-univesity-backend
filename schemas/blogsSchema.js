const mongoose = require("mongoose");
const blogsSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
    },
    blogImg: {
      type: String,
    },
    blogAuthorName: {
      type: String,
    },
    blogDescription: {
      type: String,
    },
    blogTag: {
      type: Array,
    },

    blogCategory: {
      type: String,
    },
    publishDate: {
      type: String,
    },
    key: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogsSchema);
