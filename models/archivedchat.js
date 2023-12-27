const Sequelize = require('sequelize');

const sequelize = require('../util/database');



const Archived = sequelize.define('archived',{
    chatcontent: {
        type: Sequelize.STRING
    },
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
    userId: {
        type: Sequelize.INTEGER,
    references: {
        model: 'users',
        referencesKey: 'id'
    }
}

})


module.exports = Archived