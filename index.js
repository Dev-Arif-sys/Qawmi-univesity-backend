const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userHandler = require("./routeHandler/userHandler");
const reviewHandler = require("./routeHandler/testimonialReviewHandler");
const blogHandler = require("./routeHandler/BlogsHandler");
const teacherProfileHandler = require("./routeHandler/teacherProfileHandler");
const connectDB = require("./config/db");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting mongodb
connectDB();

app.get("/", async (req, res) => {
  res.send("hello server");
});

app.use("/user", userHandler);
app.use("/api/v1/reviews", reviewHandler);
app.use("/api/v1/blogs", blogHandler);
app.use("/api/v1/teacherProfiles", teacherProfileHandler);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
  console.log(err);
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
