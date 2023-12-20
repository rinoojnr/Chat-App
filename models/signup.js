const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const User = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    useremail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
            args: true,
            message: "email already exist"
        } 
    },
    userphone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    userpassword: {
        type:Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = User;