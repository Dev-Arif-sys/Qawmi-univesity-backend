const asyncHandler = require("express-async-handler");
const userSchema = require("../schemas/userSchema");
const mongoose = require("mongoose");
const User = new mongoose.model("User", userSchema);
const bcrypt = require("bcrypt");
const generateToken = require("../utilis/generateToken");
const sendEmail = require("../utilis/sendEmail");
const crypto = require("crypto");

/****** Register user ********/

const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.find({ email: req.body.email });
    console.log(user);
    if (user.length > 0) {
      return res.status(401).json({
        error: "You are already registered",
      });
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      role: req?.body?.role,
    });

    res.status(200).json({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
      message: "registered successfully",
      sessionTime: Date.now(),
      expireTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "register failed",
    });
  }
});

/****** Login User ********/

const loginUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    // if (!user.length > 0) {
    //   return res.status(401).json({
    //     error: "Your email is not registered",
    //   });
    // }
    const IsUserValid = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    console.log(user);
  
    

    res.status(200).json({
      name: user[0].name,
      email: user[0].email,
      role: user[0].role,
      message: "logged in successfully",
      token: generateToken(user[0]._id),
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "login failed",
    });
  }
});

/****** Forgot password initialization ********/

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );

    console.log(user);

    if (user.length <= 0) {
      return res.status(401).json({
        error: "Your email could not be found",
      });
    }

    // reset token gen and add to the database
    const resetToken = user.getResetPasswordToken();
    console.log("hello");

    await user.save();

    // create reset url
    const resetUrl = `http://localhost:3000/user/passwordreset/${resetToken}`;
    // HTML Message
    const message = `
     <h1>You have requested a password reset</h1>
     <p>Please make a put request to the following link:</p>
     <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
   `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(401).json({
        error: "Email could not be sent",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "something wrong,try again",
    });
  }
});

/****** reset Password ********/

const resetPassword = asyncHandler(async (req, res) => {
  // compare token with crypto
  console.log(typeof req.params.resetToken);
  //Hash URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      res.status(401).json({
        error: "Invalid Token",
      });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({
      success: true,
      data: "Password Updated Success",
    });
  } catch (err) {
    console.log;
    res.status(401).json({
      error: "something wrong,Password can not be changed",
    });
  }
});





/****** Update user ********/



const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email }).select("-password");
    if (user.length <= 0) {
      res.status(401).json({
        error: "You are not a valid user",
      });
    }
    const updateBlock={}

    if(req.body.courseId){
      updateBlock["Course"]= [{ courseId: req.body.courseId }, ...user[0]?.Course]
    }

    if(req.body.quizMark && req.body.totalMark){
      updateBlock["quizMarks"]= [{ quizMark:req.body.quizMark, totalMark:req.body.totalMark,quizSubmittedDate:req.body.quizSubmittedDate,quizId:req.body.quizId},...user[0]?.quizMarks]
    }
    console.log(req.body)

    const updatedInfo = {
      $set: {
        ...updateBlock,
        ...req.body,
      },
    };
    console.log(updatedInfo);

    const data = await User.updateMany({ email: req.body.email }, updatedInfo);

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not update",
    });
  }
});

/****** get single info of user********/

const getSingleUserInfo = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.email);
    const user = await User.findOne({ email: req?.params?.email }).select(
      "-password"
    );
    if (!user.email) {
      res.status(401).json({
        error: "You are not a valid user",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const getManyByFilter = asyncHandler(async (req, res) => {
  try {
    console.log(req.body.emails);
    const users = await User.find({ email: { $in: req.body.emails } }).select(
      "name email number role"
    );
    console.log(users)

    res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

// getting user by role
const getUserByRole = asyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.find({ role: req.params.role }).select("-password");

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

/****** get all users********/

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({}).select("-password");

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const data = await User.deleteOne({ email: req.params.email });

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::
Get only assignment field
::::::::::::::::::::::::::::::::*/

const getAssignmentMarks = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({}).select("assignmentMarks");
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Get only single user's assignment field
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleUserAssignmentMarks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select(
      "assignmentMarks"
    );
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* Quiz */

/* ::::::::::::::::::::::::::::::::::::::
Push quiz marks to its user
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuizMarks = asyncHandler(async (req, res) => {
  try {
    var quiz = {
      quizMark: req.body.quizMark,
      totalMark: req.body.totalMark,
      quizSubmittedDate: req.body.quizSubmittedDate,
      quizId: req.body.quizId
    };

    const data = await User.findOne({ email: req.params.email });
    data.quizMarks.push(quiz);
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Get only single user's assignment field
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleUserQuiz = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("quizMarks");
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});

/* Question */

/* ::::::::::::::::::::::::::::::::::::::
Push question marks to its user
:::::::::::::::::::::::::::::::::::::::::*/
const pushQuestionMarks = asyncHandler(async (req, res) => {
  try {
    var question = {
      questionMark: req.body.questionMark,
      totalMark: req.body.totalMark,
      questionSubmittedDate: req.body.questionSubmittedDate,
      questionId: req.body.questionId,
      classRoomId: req.body.classRoomId
    };

    const data = await User.findOne({ email: req.params.email });
    data.questionMarks.push(question);
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Oppss not",
    });
  }
});

/* ::::::::::::::::::::::::::::::::::::::
Get only single user's quiz field
:::::::::::::::::::::::::::::::::::::::::*/
const getSingleUserQuestionMarks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("questionMarks");
    if (!user) {
      res.status(401).json({
        error: "Database has no assignment marks",
      });
    }
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get mark data",
    });
  }
});


/* push feedback */
const pushFeedback = asyncHandler(async (req, res) => {
  try {
    const data = await User.findOne({ email: req.params.email });
    data.feedback.push({...req.body});
    data.save();

    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Something error, can not get user data",
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateUser,
  getSingleUserInfo,
  deleteUser,
  getAllUser,
  getAssignmentMarks,
  getManyByFilter,
  getUserByRole,
  getSingleUserAssignmentMarks,
  pushQuizMarks,
  getSingleUserQuiz,
  pushQuestionMarks,
  getSingleUserQuestionMarks,
  pushFeedback
};
