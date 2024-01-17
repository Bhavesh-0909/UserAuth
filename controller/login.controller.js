const mongoose = require('mongoose');
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Please fill all fileds"
            })
        }

        const user = await User.findOne({email});

        if(user){

            const playload = {
                email:user.email,
                id:user._id,
                role:user.role
            }

            if(await bcrypt.compare(password, user.password)){

                const token = jwt.sign(playload, process.env.JWT_SECRET, {expiresIn:"2h",});

                user.token = token;
                user.password = undefined;

                const options = {
                    expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true,
                }

                res.cookie("token", token, options).status(200).json({
                    token,
                    user,
                    message:"user logind"
                })

            }else{
                return res.status(400).json({
                    message:"Password did'nt match"
                })
            }

        }
        else{
            return res.status(400).json({
                message:"User Do not exits"
            })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error while Signing up"
        })
    }
}