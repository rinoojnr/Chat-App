const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        res.status(201).json({success:true,message:"Successfuly signed up"})
    }catch(err){
        if(err.message==='Validation error'){
            return res.status(400).json({success:false,message:"User already exists, Please Login"})
        }
        res.status(400).json({success:false,message:err.message})
    } 
}

function authentication (id){
        let cryptoText = require('crypto').randomBytes(64).toString('hex')
        return jwt.sign(id,process.env.TOKEN_SECRET)
    
}


exports.login = async(req,res) =>{
    try{
        const data = await User.findAll({where: {userphone: req.body.usernumber}})
        if(data.length ===0){
            res.status(404).json({success:false,message:"user not found"})
        }else{
            bcrypt.compare(req.body.userpassword,data[0].userpassword,(err,result)=>{
                if(result == true){
                    res.status(200).json({success:true,message:"Login Successfully",token: authentication(data[0].id)})
                }else{
                    res.status(401).json({success:false,message:"Password Is Incorrect"})
                }
            })
        }
    }catch(err){
        res.status(400).status({success:false,message:"authentication is failed due to server error"})
    }
    
}




