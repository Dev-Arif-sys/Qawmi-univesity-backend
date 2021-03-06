const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
/* import handler */
const userHandler = require("./routeHandler/userHandler");
const courseHandler = require("./routeHandler/courseHandler");
const bookHandler = require("./routeHandler/bookHandler");
const classRoomHandler = require("./routeHandler/classRoomHandler");
const comingSoonHandler = require("./routeHandler/comingSoonHandler");
const communityPostHandler = require("./routeHandler/communityPostHandler");
const categoryHandler = require("./routeHandler/categoryHandler");
const faqHandler = require("./routeHandler/faqHandler");
const reviewHandler = require("./routeHandler/testimonialReviewHandler");
const blogHandler = require("./routeHandler/BlogsHandler");
const teacherProfileHandler = require("./routeHandler/teacherProfileHandler");
const PopulerSubjectsHandler = require("./routeHandler/PopulerSubjectsHandler");
const notificationHandler = require("./routeHandler/notificationHandler");
const assignmentHandler = require("./routeHandler/assignmentHandler");
const quizHandler = require("./routeHandler/quizHandler");
const pricingAddHandler = require("./routeHandler/pricingHandler");
const feedBackHandler = require("./routeHandler/allFeedBackHandler");
const sendMailHandler = require("./routeHandler/sendMailHandler");
// const imageHandler = require("./routeHandler/imageHandler");
/* DB connection and middleware and cors */
const connectDB = require("./config/db");
const app = express();
const port = 4000;
const cors = require("cors");
const crypto = require("crypto");

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting mongodb
connectDB();

app.get("/", async (req, res) => {
  res.send("Qawmi primary server is running");
});

app.use("/course", courseHandler);
app.use("/book", bookHandler);
app.use("/classRoom", classRoomHandler);
app.use("/comingSoon", comingSoonHandler);
app.use("/communityPost", communityPostHandler);
app.use("/category", categoryHandler);
app.use("/faq", faqHandler);
app.use("/user", userHandler);
app.use("/api/v1/reviews", reviewHandler);
app.use("/api/v1/blogs", blogHandler);
app.use("/api/v1/teacherProfiles", teacherProfileHandler);
app.use("/populersubjects", PopulerSubjectsHandler);
app.use("/notification", notificationHandler);
app.use("/assignment", assignmentHandler);
app.use("/quiz", quizHandler);
app.use("/pricing", pricingAddHandler);
app.use("/feedback", feedBackHandler);
app.use("/mail", sendMailHandler);
// app.use("/img", imageHandler);
// app.use(require("./routeHandler/imageHandler"));

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
