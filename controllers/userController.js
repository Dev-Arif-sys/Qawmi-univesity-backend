
const asyncHandler= require('express-async-handler')
const userSchema=require('../schemas/userSchema')
const mongoose = require('mongoose');
const User = new mongoose.model('User', userSchema)


  const registerUser=asyncHandler( async(req,res)=>{
    console.log(req.body)
      try{
       const newUser= new User({
           name:req.body.name,
           email:req.body.email,
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


module.exports= { registerUser }

