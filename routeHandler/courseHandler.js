const express=require('express')
const { default: mongoose } = require('mongoose')
const { createCourse, getAllCourse, curriculumUpdate, faqUpdate, descriptionUpdate, courseUpdate } = require('../controllers/courseController')
const router=express.Router()



router.route('/').post(createCourse).get(getAllCourse).put(courseUpdate)
router.route('/curriculum').put(curriculumUpdate)
router.route('/faq-update').put(faqUpdate)
router.route('/desc-update').put(descriptionUpdate)


module.exports=router