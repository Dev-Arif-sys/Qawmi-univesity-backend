const express=require('express')
const { default: mongoose } = require('mongoose')
const { createCourse, getAllCourse } = require('../controllers/courseController')
const router=express.Router()



router.route('/').post(createCourse).get(getAllCourse)


module.exports=router