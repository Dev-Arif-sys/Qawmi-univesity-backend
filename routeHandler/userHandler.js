const express=require('express')
const { default: mongoose } = require('mongoose')
const {registerUser, loginUser, forgotPassword, resetPassword, updateUser, getUserInfo, deleteUser, getSingleUserInfo, getAllUser,getUserByRole, getManyByFilter} = require('../controllers/userController')
const router=express.Router()
const userSchema=require('../schemas/userSchema')
const User= new mongoose.model('User',userSchema)
const {checkLogin,admin}=require('../middlewares/checkLogin')



router.route('/').put(updateUser)
router.route('/single/:email').get(getSingleUserInfo)
router.route ('/getByFiltered').get(getManyByFilter)
router.route('/role/:role').get(getUserByRole)
router.route('/delete/:email').delete(deleteUser)
router.route('/all').get(getAllUser)
router.route('/signup').post(registerUser)
router.post('/login',loginUser)
router.route('/forgotpassword').post(forgotPassword)
router.route("/passwordreset/:resetToken").put(resetPassword);




module.exports=router