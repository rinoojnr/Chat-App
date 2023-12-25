const Sequelize = require('sequelize');

const sequelize = require('../util/database');



const Content = sequelize.define('content',{
    chatcontent: {
        type: Sequelize.STRING
    }
})


module.exports = Content