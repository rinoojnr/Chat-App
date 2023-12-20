const bcrypt = require('bcrypt');

const User = require('../models/signup');

exports.signUp = async(req,res) =>{
    try{
        const lengthPhoneNumber = req.body.userphone.length;
        const lengthPassword = JSON.stringify(req.body.userpassword).length-2;

        if(lengthPhoneNumber != 10 ){
            throw new Error("Phone number is invalid")
        }
        
        if(lengthPassword<8){
            throw new Error("Password must contain atleast 8 characters")
        }
        if(req.body.userpassword!==req.body.userconfirmpassword){
            throw new Error("Password miss match")
        }

        const saltRounds = 10;
        passwordHash = await bcrypt.hash(req.body.userpassword,saltRounds);

        const data = await User.create({
            username:req.body.username,
            useremail:req.body.useremail,
            userphone:req.body.userphone,
            userpassword:passwordHash
         })
        res.json({success:true,message:"Signup Successfully"})
    }catch(err){
        if(err.message==='Validation error'){
            return res.status(400).json({success:false,message:"User already exist"})
        }
        res.status(400).json({success:false,message:err.message})
    } 
}




