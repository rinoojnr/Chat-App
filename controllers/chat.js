const Sequelize = require('sequelize')

const User = require('../models/signup');
const Chats = require('../models/chat');

const Op = require('sequelize');


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
        chatList.push({userName: userName.username,chat:chats[i].chat,chatId:chats[i].id})
    }
    res.status(200).json({success: true,message: "user messages",chats: chatList})
}


exports.getLast10Chats = async(req,res) =>{
    const lastTenChats = await Chats.findAll({
        order: [
            ['createdAt','DESC']
        ],
        limit: 10
    })
    const chats = [];
    for(let i=9;i>=0;i--){
        const userName = await User.findOne({where: {id: lastTenChats[i].userId}})
        chats.push({userName: userName.username,chat: lastTenChats[i].chat,chatId: lastTenChats[i].id})
    }
    res.json({success:true,message:"last 10 chats",chats: chats})
}


exports.getNewChats = async(req,res) =>{
    const latestChats = await Chats.findAll({
        where: {
            id: {
                [Sequelize.Op.gt]: req.query.lastmessageid
            }
        }
    })
    const chats = [];
    for(let i=0;i<latestChats.length;i++){
        const userName = await User.findOne({where: { id: latestChats[i].userId}})
        chats.push({ userName:userName.username,chat: latestChats[i].chat,chatId:latestChats[i].id })
    }
    res.json({success:true,message: "latest chats",chats: chats})
}