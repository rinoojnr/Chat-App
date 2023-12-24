const express = require('express');


const chatController = require('../controllers/chat');
const authenticationMiddileware = require('../middileware/authentication');

const router = express.Router();

router.get('/home/chatusers',authenticationMiddileware.authentication,chatController.getUsers);
router.post('/home/chat',authenticationMiddileware.authentication,chatController.postChats);
router.get('/home/chats',authenticationMiddileware.authentication,chatController.getChats);
router.get('/home/newchats',chatController.getNewChats)
router.get('/home/lastchats',chatController.getLast10Chats)

module.exports = router;