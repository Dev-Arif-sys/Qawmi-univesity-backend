const  mongoose=require('mongoose')
const { Schema } = mongoose;
const crypto=require('crypto');

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
    },
    resetPasswordExpire:Date,
    resetPasswordToken:String

})

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  };


userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    
    // Hash token (private key) and save to database
    const encryptedToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    console.log(crypto
        .createHash("sha256")
        .update('aff3158ce4efa379c27246ecba4c4682bec27863')
        .digest("hex"))
    this.resetPasswordToken = encryptedToken
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };


module.exports=userSchema