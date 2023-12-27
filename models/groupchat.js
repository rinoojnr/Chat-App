const Sequelize = require('sequelize');

const sequelize = require('../util/database');
// const GroupMember = require('./groupmember');


const GroupChat = sequelize.define('groupchat',{
        groupId: {
            type: Sequelize.INTEGER,
        references: {
            model: 'groups',
            referencesKey: 'id'
        }
    },
        groupmemberId: {
            type: Sequelize.INTEGER,
        references: {
            model: 'groupmembers',
            referencesKey: 'id'
        }
    },
        contentId: {
            type: Sequelize.INTEGER,
        references: {
            model: 'contents',
            referencesKey: 'id'
        }
    }
})


module.exports = GroupChat;