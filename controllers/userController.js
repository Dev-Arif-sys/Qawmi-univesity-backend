
const asyncHandler = require('express-async-handler')
const userSchema = require('../schemas/userSchema')
const mongoose = require('mongoose');
const User = new mongoose.model('User', userSchema)
const bcrypt = require('bcrypt')
const generateToken = require('../utilis/generateToken');
const sendEmail = require('../utilis/sendEmail');
const crypto=require('crypto')


const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      role: req?.body?.role
    })

    res.status(200).json({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
      message: 'registered successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'register failed'
    })
  }
})


const loginUser = asyncHandler(async (req, res) => {
  try {

    const user = await User.find({ email: req.body.email })

    if (user && user.length > 0) {
      const IsUserValid = await bcrypt.compare(req.body.password, user[0].password)
      console.log(user)
      if (IsUserValid) {

        res.status(200).json({
          name: user[0].name,
          email: user[0].email,
          role: user[0].role,
          message: 'logged in successfully',
          token: generateToken(user[0]._id),

        })
      }
    }

  } catch (err) {
    console.log(err)
    res.status(401).json({
      error: 'login failed'
    })
  }
}
)


// forgot password initialization
const forgotPassword = asyncHandler(async (req, res) => {


  try {


    const user = await User.findOne({ email: req.body.email }).select('-password')

    console.log(user)

    if (!user) {
      res.status(401).json({
        error: 'Your email could not be found'
      })
    }

    // reset token gen and add to the database
    const resetToken = user.getResetPasswordToken();
   console.log('hello')
    console.log(resetToken)
    await user.save();

    // create reset url
    const resetUrl = `http://localhost:4000/user/passwordreset/${resetToken}`;
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
      
      console.log(err)

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(401).json({
        error: 'Email could not be sent'
      })
    }


  } catch (err) {
    console.log(err)
    res.status(401).json({
      error: 'something wrong,try again'
    })
  }
})


const resetPassword=asyncHandler(async(req,res)=>{
  // compare token with crypto
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.resetToken)
  .digest("hex");
    try{
      const user = await User.findOne({
        resetPasswordToken
        
      });
      console.log(req.params.resetToken)
      console.log(user)
      console.log(resetPasswordToken)
      console.log(req.params.resetToken)
     

      if (!user) {
        res.status(401).json({
          error: 'Invalid Token'
        })
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedJwtToken(),
      });
    }catch(err){
      console.log
      res.status(401).json({
      error: 'something wrong,Password can not be changed'
      })
    }

})


module.exports = { registerUser, loginUser, forgotPassword,resetPassword }

