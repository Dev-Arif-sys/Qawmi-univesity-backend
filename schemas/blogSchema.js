const mongoose=require('mongoose')
 const { Schema } = mongoose;

 const blogSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tags:[{
        tag:String
    }],
    blog:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    }
 })