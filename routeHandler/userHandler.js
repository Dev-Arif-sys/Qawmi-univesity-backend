const express=require('express')
const { default: mongoose } = require('mongoose')
const {registerUser, loginUser, forgotPassword, resetPassword} = require('../controllers/userController')
const router=express.Router()
const userSchema=require('../schemas/userSchema')
const User= new mongoose.model('Users',userSchema)
const {checkLogin,admin}=require('../middlewares/checkLogin')


router.post('/signup',registerUser)
router.post('/login',loginUser)
router.get("/all",checkLogin, async(req,res)=>{
    res.json("check the login middleware")
})

router.route('/forgotpassword').post(forgotPassword)
router.route("/passwordreset/:resetToken").put(resetPassword);



module.exports=router