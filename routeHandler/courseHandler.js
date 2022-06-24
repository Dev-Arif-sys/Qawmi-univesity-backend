const express=require('express')
const { default: mongoose } = require('mongoose')
const { createCourse, getAllCourse, curriculumUpdate, faqUpdate, descriptionUpdate, courseUpdate, getSingleCourse } = require('../controllers/courseController')
const router=express.Router()



router.route('/').post(createCourse).get(getAllCourse).put(courseUpdate)
router.route('/curriculum').put(curriculumUpdate)
router.route('/faq-update').put(faqUpdate)
router.route('/desc-update').put(descriptionUpdate)
router.route('/:id').get(getSingleCourse)


module.exports=router