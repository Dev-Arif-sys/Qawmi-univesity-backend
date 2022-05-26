
const asyncHandler= require('express-async-handler')
const userSchema=require('../schemas/userSchema')
const mongoose = require('mongoose');
const User = new mongoose.model('User', userSchema)
const bcrypt=require('bcrypt')
const generateToken=require('../utilis/generateToken')


  const registerUser=asyncHandler( async(req,res)=>{
    console.log(req.body)
      try{
        const hashedPass=await bcrypt.hash(req.body.password,10)
       const newUser= await User.create({
           name:req.body.name,
           email:req.body.email,
           password:hashedPass,
           role:req?.body?.role
       })
       
       res.status(200).json({
         name:newUser.name,
         email:newUser.email,
         role:newUser.role,
         token:generateToken(newUser._id),
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
    console.log(user)
    if(IsUserValid){
      
      res.status(200).json({
        name:user[0].name,
        email:user[0].email,
        role:user[0].role,
        message: 'logged in successfully',
        token:generateToken(user[0]._id),
       
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

