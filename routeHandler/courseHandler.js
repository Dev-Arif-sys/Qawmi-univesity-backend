const express=require('express')
const { default: mongoose } = require('mongoose')
const { createCourse, getAllCourse, courseUpdate, getSingleCourse,getManyByFilter,getSingleCourseforStudent,getSingleForAdmin } = require('../controllers/courseController')
const router=express.Router()



router.route('/').post(createCourse).get(getAllCourse).put(courseUpdate)
router.route("/update").put(courseUpdate)
router.route('/:id').get(getSingleCourse)
router.route('/single-student/:id').get(getSingleCourseforStudent)
router.route('/single-admin/:id').get(getSingleForAdmin)
router.route("/get-courseby-filter").put(getManyByFilter)


module.exports=router