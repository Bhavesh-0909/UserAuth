const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next)=>{
    try {
        const token = req.body.token || req.cookies.token || req.headers['authorization'].replace("Bearer ", "");
        if(!token){
            return res.status(402).json({
                message:"token not found"
            })
        }
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            req.user = data;

            next()
        } catch (error) {
            res.status(500).json({
            message:"USer not verified",
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:"User token didnt fetch",
        })
    }
}

exports.isStudent = (req, res, next)=>{
    try {

        const role = req.user.role;

        if(role !== "Student") {
            return res.status(402).json({
                message:"This route is for student you are not allowed"
            })
        } 

        next()

    } catch (error) {
        res.status(500).json({
            message:"Error",
        })
    }
}

exports.isAdmin = (req, res, next)=>{
    try {

        const role = req.user.role;

        if(role !== "Admin") {
            return res.status(402).json({
                message:"This route is for admin you are not allowed"
            })
        } 

        next()

    } catch (error) {
        res.status(500).json({
            message:"Error",
        })
    }
}