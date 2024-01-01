const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const User = require('../models/signup');

dotenv.config();

exports.authentication = (req,res,next) =>{
    try{
        const token = req.header("Authentication");
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        req.valid = true
        next();
    }
    catch(err){
        req.valid = false;
        res.json({success:false,message: "Authentication denied",isAlive: false})
    }

}