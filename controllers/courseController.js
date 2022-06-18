const asyncHandler = require('express-async-handler')
const courseSchema = require('../schemas/courseSchema')
const mongoose = require('mongoose');
const Course = new mongoose.model('Course', courseSchema)




const createCourse=asyncHandler(async(req,res)=>{
    try{
      console.log(req.body)
        const newCourse= await Course.create({
            ...req.body
        })
     
        res.status(200).json({
            success:true,
            message: 'Course created Successfully',
            
          })

    }catch(error){
      console.log(error)
        res.status(500).json({
            error: 'something wrong, cannot create course'
          })
    }
})


const getAllCourse=asyncHandler(async(req,res)=>{
    try{
      const courses = await Course.find({}).select({
          description:0,
        
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


  const courseUpdate=asyncHandler(async(req,res)=>{
    try{
      const c_id=req.body.id.courseId
      const data= await Course.findOneAndUpdate({_id :c_id},
        {$set:{
          ...req.body.data
        }})

        res.status(201).json({
          success: true,
          data:data, 
        });
    }catch(error){
      console.log(error)
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
    }
  })


const curriculumUpdate=asyncHandler(async(req,res)=>{
  try{
    
    const v_id=req.body.id.videoId
    const m_id=req.body.id.moduleId
    const c_id=req.body.id.courseId
    console.log(req.body)
    // const data= await Course.findOneAndUpdate(
    //     {"_id":"629715673a11b5f99d34b489"},
    //    {$set:{'medium':"offline"}}
        
    //   )

    const data= await Course.findOneAndUpdate(
      {_id :c_id},
      {$set : { "curriculum.$[m].moduleName" : req.body.data?.moduleName,
      "curriculum.$[m].videos.$[v].title" : req.body.data?.title,
      "curriculum.$[m].videos.$[v].link" : req.body.data?.link, 
     },
          
     }, 
      { arrayFilters: [ { "m._id":m_id   },{"v._id":v_id} ] }
    )
  
    
    res.status(201).json({
      success: true,
      data:data, 
    });
    }catch(error){
      console.log(error)
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
  }
}) 





const faqUpdate=asyncHandler(async(req,res)=>{
  try{
    
    
    const q_id=req.body.id.questionId
    const c_id=req.body.id.courseId
    console.log(req.body)
    // const data= await Course.findOneAndUpdate(
    //     {"_id":"629715673a11b5f99d34b489"},
    //    {$set:{'medium':"offline"}}
        
    //   )

    const data= await Course.findOneAndUpdate(
      {_id :c_id},
      {$set : { "FAQ.$[q].question" : req.body.data?.question,
      "FAQ.$[q].answer" : req.body.data?.answer,
     },
          
     }, 
      { arrayFilters: [ { "q._id":q_id   } ] }
    )
  
    
    res.status(201).json({
      success: true,
      data:data, 
    });
    }catch(error){
      console.log(error)
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
  }
}) 



const descriptionUpdate=asyncHandler(async(req,res)=>{
  try{
    
    
    const r_id=req.body.id.reasonId
    const c_id=req.body.id.courseId
    console.log(req.body)
    

    const data= await Course.findOneAndUpdate(
      {_id :c_id},
      {$set : { "description.bigDesc" : req.body.data?.bigDesc,
      "description.reasons.$[r].reason" : req.body.data?.reason,
     },
          
     }, 
      { arrayFilters: [ { "r._id":r_id   } ] }
    )
  
    
    res.status(201).json({
      success: true,
      data:data, 
    });
    }catch(error){
      console.log(error)
      res.status(401).json({
        error: 'Something error, can not get user data'
      })
  }
}) 


module.exports={createCourse,getAllCourse,curriculumUpdate,faqUpdate,descriptionUpdate,courseUpdate}