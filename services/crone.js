const { CronJob } = require('cron');
const  Op = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Content = require('../models/content');
const Archived = require('../models/archivedchat');
const GroupChat = require('../models/groupchat');
const GroupMember = require('../models/groupmember');




exports.job = new CronJob(
	'0 0 * * *', // cronTime
	function () {
        archivedFunction()
	}, // onTick
	null, // onComplete
	true, // start
	'Asia/Kolkata' // timeZone
);



async function archivedFunction(){
    try{
        const date = new Date();
        let _5daysBefore = new Date();
        _5daysBefore.setDate(date.getDate() - 5);


        const Contents = await Content.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.lt]:_5daysBefore
                } 
            }
        })


        for(let i=0;i<Contents.length;i++){ 
            const GroupChats = await GroupChat.findOne({
                where: {
                    contentId: Contents[i].id
                }
            });
            if(GroupChats == null){
                continue;
            }
            const GroupMembers = await GroupMember.findOne({
                where: {
                    id: GroupChats.groupmemberId
                }
            });
            await Archived.create({
                chatcontent: Contents[i].chatcontent,
                groupId: GroupChats.groupId,
                groupmemberId:  GroupChats.groupmemberId,
                userId: GroupMembers.userId
            })
        }
    }catch(err){
        console.log(err)
    }
}




