const jsonwebtoken = require("jsonwebtoken")
const userSchema=require('../schemas/userSchema')
const mongoose = require('mongoose');
const User = new mongoose.model('User', userSchema)


const checkLogin = async(req, res, next) => {
    const { authorization } = req.headers
    try {
        if (authorization && authorization.startsWith('Bearer')) {
            const token = authorization.split(" ")[1]
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)


            req.user = await User.findById(decoded.id).select("-password");


            next()
        }


    } catch(err) {
         console.log(err)
        next('Authentication failed')
    }
}


const admin = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
        next();
    } else {
        res.status(401).json({
            message:"not authorized as admin"
        });
       
    }
};

module.exports = {checkLogin,admin}