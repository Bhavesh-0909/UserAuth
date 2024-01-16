const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trime:true
    },
    email:{
        type:String,
        required:true,
        trime:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin", "Student", "Instructor"]
    }
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);