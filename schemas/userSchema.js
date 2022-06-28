const  mongoose=require('mongoose')
const { Schema } = mongoose;
const crypto=require('crypto');
const bcrypt = require('bcrypt')

const jwt=require('jsonwebtoken')

const userSchema=mongoose.Schema({
    ID:String,
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

    profession:String,
    school:String,
    address:String,
    fatherName:String,
    number:String,
     dob:String,
     married:String,
     nationality:String,
     birthCertificate:String,
     gender:String,
     NID:String,
     passport:String,
     bio:String,
     perCountry:String,
     perDistrict:String,
     perThana:String,
     perPostCode:String,
     perAddressLine:String,
     currCountry:String,
     currDistrict:String,
     currThana:String,
     currPostCode:String,
     currAddressLine:String,
     studiedSchool:String,
     studiedSubject:String,
     qual1:String,
     qual2:String,
     qual3:String,
     teachedInstitute:String,
     teachedSub:String,
     teachingExperience:String,
     Department:String,
     subjectList:String,
     joiningDate:String,
     mfsNumber:String,
     mfsMedium:String,
     bankName:String,
     bankAccountName:String,
     bankAccountNum:String,
     branchName:String,
     routingName:String,
     Course:[
        {
            
            courseId:String,
            CourseInfo:Array
        }
       
     ],
     payment:{},
     levels:{
        level1:String,
        level2:String,
        level3:String,
        level4:String,
        level5:String,

     },
     
    resetPasswordExpire:Date,
    resetPasswordToken:String,
    assignmentMarks:[
        {
            quiz:Array,
            question:Array
        }
    ]

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