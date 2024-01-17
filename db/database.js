const mongoose = require('mongoose');
require('dotenv').config()

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        .then(()=>{console.log("DB connected")})
        .catch((err)=>{console.error("DB Error", err)})
    }
    catch(error){
        console.error("DB Error", error)
    }
}

module.exports = dbConnect;