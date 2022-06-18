const  mongoose=require('mongoose')
const { Schema } = mongoose;
const crypto=require('crypto');
const bcrypt = require('bcrypt')

const jwt=require('jsonwebtoken')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String, 
        default:""      
    },
    profession:{
       type:String,
       default:""      
    },
    school:{
        type:String,
        default:""        

     },
     gender:{
         type:String,
         default:""      
     },
     address:{
         type:String,
         default:""      
     },
     
    resetPasswordExpire:Date,
    resetPasswordToken:String

})




userSchema.methods.getResetPasswordToken =   () =>{
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    
    // Hash token (private key) and save to database
    const encryptedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log(resetToken)
    console.log(encryptedToken)
   
    this.resetPasswordToken = encryptedToken
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };


module.exports=userSchema