const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Groups = sequelize.define('groups',{
    groupname: {
        type: Sequelize.STRING,
        allowNull: false    
    }
})


module.exports = Groups;