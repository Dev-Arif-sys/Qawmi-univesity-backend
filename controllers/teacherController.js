const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const teacherSchema=require('../schemas/teacherSchema')
const Teacher= new mongoose.model("Teacher",teacherSchema)


const addTeacher=asyncHandler(async(req,res)=>{
    try{
      console.log(req.body)
      const user = await Teacher.find({ email: req.body.email })
    console.log(user )
    if ( user.length>0) {
     return  res.status(401).json({
        error: 'The teacher is already added'
      })
    }
      
    const newTeacher = await Teacher.create({
      ...req.body
    })
      
        res.status(200).json({
            success:true,
            message: 'teacher added Successfully',
            data:newTeacher
            
          })
    
    }catch(error){
      console.log(error)
        res.status(500).json({
            error: 'something wrong, cannot create course'
          })
    }
})



module.exports={addTeacher}