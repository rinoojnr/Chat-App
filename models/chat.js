const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chats = sequelize.define('chats',{
    chat: {
        type: Sequelize.STRING
    }
})


module.exports = Chats;