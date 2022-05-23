const express=require('express')
const { default: mongoose } = require('mongoose')
const {registerUser} = require('../controllers/userController')
const router=express.Router()
const userSchema=require('../schemas/userSchema')
const User= new mongoose.model('Users',userSchema)


router.post('/',registerUser)


module.exports=router