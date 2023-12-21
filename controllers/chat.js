const User = require('../models/signup');
const Chats = require('../models/chat');

exports.users = async(req,res) =>{
    const userData = await User.findAll();
    const usersName = [];
    for(let i=0;i<userData.length;i++){
        usersName.push({username: userData[i].username})
    }
    res.status(200).json({success:true,message:"users list",users: usersName})
}

exports.chats = async(req,res) =>{
    console.log(req.user)
    await Chats.create({chat: req.body.chat,userId: req.user.id})
}