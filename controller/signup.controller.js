const mongoose = require('mongoose');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');

exports.signup = async(req, res)=>{

    try {
        const {name, email, password, role} = req.body;
       
        const extingUser = await User.findOne({email});

        if(extingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exist"
            })
        }

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);            
        } catch (error) {
            return res.status(402).json({
                success:false,
                message:"Password hashinf Failed"
            })
        }

        const dbInsert = await User.create({
            name, email, password:hashPassword, role
        });

        res.status(200).json({
            message:"User Created",
            success:true
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }

}