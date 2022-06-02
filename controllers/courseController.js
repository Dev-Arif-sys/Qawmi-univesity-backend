const asyncHandler = require('express-async-handler')
const courseSchema = require('../schemas/courseSchema')
const mongoose = require('mongoose');
const Course = new mongoose.model('Course', courseSchema)



const createCourse=asyncHandler(async(req,res)=>{
    try{
        const newCourse= await Course.create({
            ...req.body
        })
     
        res.status(200).json({
            success:true,
            message: 'Course created Successfully',
            
          })

    }catch(error){
        res.status(500).json({
            error: 'something wrong, cannot create course'
          })
    }
})


const getAllCourse=asyncHandler(async(req,res)=>{
    try{
      const courses = await Course.find({}).select({
          description:0,
           curriculum:0,
           FAQ:0,
        announcement:0})
     
  
      res.status(201).json({
        success: true,
        data:courses, 
      });
  
    }catch(error){
      console.log(error)
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
    }
  })


module.exports={createCourse,getAllCourse}