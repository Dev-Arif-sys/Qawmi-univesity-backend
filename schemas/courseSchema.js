const  mongoose=require('mongoose')
const { Schema } = mongoose;




const courseSchema=mongoose.Schema({
    title: {
        type:String,
        required:"true"
    },
    subTitle:{
        type:String
    },
    image:{
        type:String,
        required:"true"
    },
    category:{
        type:String,
        required:"true"
    },
    createdBy:{
        type:String,
        required:"true"
    },
    lesson:{
        type:Number,
        required:"true"
    },
    durationHr:{
        type:String,
        required:"true"
    },
    durationMt:{
        type:String,
        required:"true"
    },
    certificate:{
        type:Boolean,
        default:false
    },
    article:{
        type:Number
    },
    medium:{
         type:String
    },
    access:{
        type:String
    },
    level:{
        type:String,
        required:"true"
    } ,
   teacherInfo:[
       {
           name:String,
           email:String,
           avatar:String
       }
   ],
    
    oldPrice: {
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
   description:{
       bigDesc:String,
       reasons:[
           {
               reason:String
           }
       ]
   },
   curriculum:[
       {
           moduleName:String,
           videos:[{
               title:String,
               link:String
           }],
           status:String
       }
   ],
   FAQ:[
       {
           question:String,
           answer:String
       }
   ],
   announcement:String

})




  
    
   


module.exports=courseSchema