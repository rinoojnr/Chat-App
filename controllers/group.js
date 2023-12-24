const jwt = require('jsonwebtoken');
const Op = require('sequelize');
const Sequelize = require('sequelize');

const User = require('../models/signup');
const Groups = require('../models/group');
const sequelize = require('../util/database');

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
    await Groups.create({
        groupname: req.body.groupname,userId:req.user.id
    })
    const numberOfUsers = req.body.members.length;
    for(let i=0;i<numberOfUsers;i++){
        await Groups.create({
            groupname: req.body.groupname,
            userId: jwt.verify(req.body.members[i],'f244c652502fdfa22f797cd8bea18894c943939899feb0f6b85cfba16d41e6419224d4894b9f622ae6a3ac2f3b7ef8cdf674f21ecb728c47f6276839f711244c')
        })
    }
    const groupsIncluded = await myGroups(req.user.id);
    // console.log(groupsIncluded.length)
    
    res.status(200).json({success:true,message:"group created",groups:groupsIncluded})
    
}



async function myGroups(id){
    const groupsIncluded = await Groups.findAll({where: {userId: id}});
    const groupsIncludedName = [];
    for(let i=0;i<groupsIncluded.length;i++){
        groupsIncludedName.push(groupsIncluded[i].groupname)
    }
    return (groupsIncludedName)
}
