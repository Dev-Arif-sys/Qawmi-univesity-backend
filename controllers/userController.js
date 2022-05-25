
const asyncHandler= require('express-async-handler')
const userSchema=require('../schemas/userSchema')
const mongoose = require('mongoose');
const User = new mongoose.model('User', userSchema)
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


  const registerUser=asyncHandler( async(req,res)=>{
    console.log(req.body)
      try{
        const hashedPass=await bcrypt.hash(req.body.password,10)
       const newUser= new User({
           name:req.body.name,
           email:req.body.email,
           password:hashedPass,
           role:req?.body?.role
       })
       await newUser.save()
       res.status(200).json({
        message: 'registered successfully'
      })
      }catch(error){
          console.log(error)
        res.status(500).json({
            error: 'register failed'
          })
      }
})


const loginUser=asyncHandler(async(req,res)=>{
  try{
    const user= await User.find({email:req.body.email})
    if(user && user.length>0){
    const IsUserValid= await bcrypt.compare(req.body.password,user[0].password)
    
    if(IsUserValid){
      const token=jwt.sign({
          username:user[0].email,
          userid:user[0]._id
      },process.env.JWT_SECRET,{
          expiresIn:'1h'
      })
      res.status(200).json({
        message: 'logged in successfully',
        access_token:token
      })
    }
    }

}catch(err){
  console.log(err)
    res.status(401).json({
        error: 'login failed'
      })
}
}
)


module.exports= { registerUser,loginUser }

