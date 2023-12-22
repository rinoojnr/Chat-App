const User = require('../models/signup');
const Chats = require('../models/chat');

exports.getUsers = async(req,res) =>{
    const userData = await User.findAll();
    const usersName = [];
    for(let i=0;i<userData.length;i++){
        if(req.user.id === userData[i].id){
            continue;
        }
    usersName.push({username: userData[i].username})
    }
    res.status(200).json({success:true,message:"users list",users: usersName})
}

exports.postChats = async(req,res) =>{
    console.log(req.user)
    await Chats.create({chat: req.body.chat,userId: req.user.id})
}

exports.getChats = async(req,res) =>{
    const chats = await Chats.findAll();
    const noOfchats = chats.length;
    const chatList = []
    for(let i=0;i<noOfchats;i++){
        const userName = await User.findOne({where: {id: chats[i].userId}});
        chatList.push({userName: userName.username,chat:chats[i].chat})
    }
    res.status(200).json({success: true,message: "user messages",chats: chatList})
}