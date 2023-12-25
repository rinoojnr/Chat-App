const jwt = require('jsonwebtoken');
const Op = require('sequelize');
const Sequelize = require('sequelize');


const User = require('../models/signup');
const Groups = require('../models/group');
const GroupMember = require('../models/groupmember');
const sequelize = require('../util/database');
const Content = require('../models/content');
const GroupChat = require('../models/groupchat');
const s3Service = require('../services/s3service');

exports.getUsers = async(req,res) =>{
    const id = req.user.id
    const user = await User.findAll({where: {id: {
        [Sequelize.Op.ne]: id
    }}})
    const users = [];
    for(let i=0;i<user.length;i++){
        users.push({userName: user[i].username,userId: jwt.sign(user[i].id,"f244c652502fdfa22f797cd8bea18894c943939899feb0f6b85cfba16d41e6419224d4894b9f622ae6a3ac2f3b7ef8cdf674f21ecb728c47f6276839f711244c")})
    }
  res.status(200).json({success:true,message:"group created",users: users})  
}


exports.createGroup = async(req,res) =>{
    const grp = await Groups.create({
        groupname: req.body.groupname,owner:req.user.id
    })
    const numberOfUsers = req.body.members.length;
    await GroupMember.create({
        groupId: grp.id,
        userId: req.user.id
    })
    for(let i=0;i<numberOfUsers;i++){
        await GroupMember.create({
            groupId: grp.id,
            userId: jwt.verify(req.body.members[i],'f244c652502fdfa22f797cd8bea18894c943939899feb0f6b85cfba16d41e6419224d4894b9f622ae6a3ac2f3b7ef8cdf674f21ecb728c47f6276839f711244c')
        })
    }
    const groupsIncluded = await myGroups(req.user.id);
    
    res.status(200).json({success:true,message:"group created",groups:groupsIncluded})
    
}



async function myGroups(id){
    const groupsIncluded = await GroupMember.findAll({where: {userId: id}});
    const groupsIncludedName = [];
    for(let i=0;i<groupsIncluded.length;i++){
        const groupMembersCount = await GroupMember.count({where: {groupId: groupsIncluded[i].groupId}})
        let grp = await Groups.findOne({where: {id: groupsIncluded[i].groupId}})
        groupsIncludedName.push({groupName: grp.groupname,groupId:groupsIncluded[i].groupId})
    }
    return (groupsIncludedName)
}


exports.sendGroupMessage = async(req,res) => {
    if(req.body.isImage === false){
        let grpMember = await GroupMember.findOne({where: {userId: req.user.id, groupId: req.body.groupId}})
        let content = await Content.create({
            chatcontent: req.body.content
        })
        GroupChat.create({
            groupId: req.body.groupId,
            groupmemberId: grpMember.id,
            contentId: content.id
        })
        res.json({success:true,message:"message sent",groupId:req.body.groupId})
    }else{
        let grpMember = await GroupMember.findOne({where: {userId: req.user.id, groupId: req.body.groupId}})
        const filename = `ChatApp-Images${req.user.id}/${new Date()}`;
        console.log(req.body.content,"................///.....................///...................")
        const fileUrl = await s3Service.uploadTos3(req.body.content,filename);
        let content = await Content.create({
            chatcontent: req.body.content
        })
        GroupChat.create({
            groupId: req.body.groupId,
            groupmemberId: grpMember.id,
            contentId: content.id
        })
        res.json({success:true,message:"message sent",groupId:req.body.groupId,fileUrl})
    }
    
}

exports.getGroupMessage = async(req,res) => {
    let grpMessages =await GroupChat.findAll({where: {groupId: req.query.groupId}})
    const messages = [];
    let groupName = await Groups.findOne({where: {id: req.query.groupId}});
    let grpMemberLength = await GroupMember.count({where:{groupId: req.query.groupId}});
    for(let i=0;i<grpMessages.length;i++){
        let message = grpMessages[i];
        let grpMember = await GroupMember.findOne({where:{id: message.groupmemberId}})
        let user = await User.findOne({where: {id: grpMember.userId}});
        console.log(message)
        let content = await Content.findOne({where: {id: message.contentId}})
        messages.push({userName: user.username, chatcontent: content.chatcontent, createdAt: message.createdAt})
    }
    res.json({success:true,message:"message get",content:messages,groupName: groupName.groupname,groupMembersLength: grpMemberLength})
}

exports.editGroup = async(req,res) =>{
    console.log(req.query.groupId)
    const group = await Groups.findOne({where: {id: req.query.groupId},attributes: ['owner']});
    if(req.user.id != group.owner){
        res.json({success:false,message:"only admin can edit the group"});
    }else{
        await Groups.update({groupname: req.body.groupname},{
                where: {
                    id:req.query.groupId
                }
            })
            if(req.body.checked){
                console.log(req.body.checked.userId,"//",req.query.groupId)
                await GroupMember.create({groupId: req.query.groupId,userId: req.body.checked.userId});
            }

            if(req.body.unchecked){
                await GroupMember.destroy({where: {userId: req.body.unchecked.userId,groupId: req.query.groupId}})
            }
        
        
        res.json({success:true,message:"admin can change the group"})
    }
}





