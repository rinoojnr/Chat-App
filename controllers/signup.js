const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/signup')

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

function authentication (id,username,isAlive){
        return jwt.sign({id: id,userName: username,isAlive: isAlive},"f244c652502fdfa22f797cd8bea18894c943939899feb0f6b85cfba16d41e6419224d4894b9f622ae6a3ac2f3b7ef8cdf674f21ecb728c47f6276839f711244c",{expiresIn:"1800s"})
    
}


exports.login = async(req,res) =>{
    try{
        const data = await User.findAll({where: {userphone: req.body.usernumber}})
        if(data.length ===0){
            res.status(404).json({success:false,message:"user not found"})
        }else{
            bcrypt.compare(req.body.userpassword,data[0].userpassword,(err,result)=>{
                if(result == true){
                    res.status(200).json({success:true,message:"Login Successfully",token: authentication(data[0].id,data[0].username,true)})
                }else{
                    res.status(401).json({success:false,message:"Password Is Incorrect"})
                }
            })
        }
    }catch(err){
        res.status(400).status({success:false,message:"authentication is failed due to server error"})
    }
    
}




