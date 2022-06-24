
const asyncHandler = require('express-async-handler')
const userSchema = require('../schemas/userSchema')
const mongoose = require('mongoose');
const User = new mongoose.model('User', userSchema)
const bcrypt = require('bcrypt')
const generateToken = require('../utilis/generateToken');
const sendEmail = require('../utilis/sendEmail');
const crypto = require('crypto');



 /****** Register user ********/ 

const registerUser = asyncHandler(async (req, res) => {
  
  try {
    console.log(req.body)
    const user = await User.find({ email: req.body.email })
    console.log(user )
    if ( user.length>0) {
     return  res.status(401).json({
        error: 'You are already registered'
      })
    }
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
      message: 'registered successfully',
      sessionTime:Date.now(),
      expireTime: Date.now()  + (30 * 24 * 60 * 60 * 1000)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'register failed'
    })
  }
})







  /****** Login User ********/ 



const loginUser = asyncHandler(async (req, res) => {
  try {

    const user = await User.find({ email: req.body.email })

    if ( !user.length > 0) { 
     return res.status(401).json({
        error: 'Your email is not registered'
      })
    }
      const IsUserValid = await bcrypt.compare(req.body.password, user[0].password)
      console.log(user)
      if (!IsUserValid) {

        res.status(401).json({
          error: 'Invalid Credentials'
        })
       
      }

      res.status(200).json({
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        message: 'logged in successfully',
        token: generateToken(user[0]._id),

      })
    

  } catch (err) {
    console.log(err)
    res.status(401).json({
      error: 'login failed'
    })
  }
}
)







  /****** Forgot password initialization ********/ 



const forgotPassword = asyncHandler(async (req, res) => {


  try {


    const user = await User.findOne({ email: req.body.email }).select('-password')

    console.log(user)

    if (user.length<=0) {
     return  res.status(401).json({
        error: 'Your email could not be found'
      })
    }

    // reset token gen and add to the database
    const resetToken = user.getResetPasswordToken();
    console.log('hello')

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







/****** reset Password ********/ 


const resetPassword = asyncHandler(async (req, res) => {
  // compare token with crypto
  console.log(typeof (req.params.resetToken))
  //Hash URL Token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }

    });

    console.log(user)

  


    if (!user) {
      res.status(401).json({
        error: 'Invalid Token'
      })
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10)

    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({
      success: true,
      data: "Password Updated Success"
    });
  } catch (err) {
    console.log
    res.status(401).json({
      error: 'something wrong,Password can not be changed'
    })
  }

})


 /****** Update user ********/ 


const updateUser=asyncHandler(async(req,res)=>{
  try{
    const user = await User.find({ email: req.body.email }).select('-password')
    if(user.length<=0){
      res.status(401).json({
        error: 'You are not a valid user'
      })
    }


    const updatedInfo={
      "$set":{
        profession:req.body.profession || user[0].profession,
        school:req.body.school || user[0].school,
        gender:req.body.gender || user[0].gender,
        address:req.body.address || user[0].address,
      }
    }
   console.log(updatedInfo)

      await User.updateMany({email:req.body.email},updatedInfo)

    res.status(201).json({
      success: true,
      data: " Updated Success", 
    });
  }catch(error){
    console.log(error)
    res.status(401).json({
      error: 'Something error, can not update'
    })
  }
})

const updateRole=asyncHandler(async(req,res)=>{
  try{
    const user = await User.find({ email: req.body.email }).select('-password')

    console.log(user)
    if(user.length<=0){
      res.status(401).json({
        error: 'the email is not registered'
      })
    }


    const updatedInfo={
      "$set":{
        role:req.body.role || user[0].role,
        purchasedCourse:[{courseId:req.body.courseId},...user[0]?.purchasedCourse,] || user[0]?.purchasedCourse       
      }
    }
   console.log(updatedInfo)

      await User.updateOne({email:req.body.email},updatedInfo)

    res.status(201).json({
      success: true,
      data: " Updated Success", 
    });
  }catch(error){
    console.log(error)
    res.status(401).json({
      error: 'Something error, can not update'
    })
  }
})




  /****** get single info of user********/ 

const getSingleUserInfo=asyncHandler(async(req,res)=>{
  try{
    const user = await User.findOne({ email: req.body.email }).select('-password')
    if(!user){
      res.status(401).json({
        error: 'You are not a valid user'
      })
    }

   

    res.status(201).json({
      success: true,
      data:user, 
    });

  }catch(error){
    console.log(error)
    res.status(401).json({
      error: 'Something error, can not get user data'
    })
  }
})






  /****** get all users********/ 

const getAllUser=asyncHandler(async(req,res)=>{
  try{
    const user = await User.find({}).select('-password')
   

    res.status(201).json({
      success: true,
      data:user, 
    });

  }catch(error){
    console.log(error)
    res.status(401).json({
      error: 'Something error, can not get user data'
    })
  }
})



const deleteUser=asyncHandler(async(req,res)=>{
  try{
    const user = await User.findOne({ email: req.body.email }).select('-password')
    if(!user){
      res.status(401).json({
        error: 'You are not a valid user'
      })
    }
    

   const data= await User.deleteOne({email:req.body.email})

    res.status(201).json({
      success: true,
      data: data, 
    });


   
  }catch(error){
    
    res.status(401).json({
      error: 'Something error, can not get user data'
    })

  }
})



module.exports = { registerUser, loginUser, forgotPassword, resetPassword,updateUser,getSingleUserInfo,deleteUser,getAllUser,updateRole }

