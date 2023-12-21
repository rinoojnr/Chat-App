const express = require('express');

const chatController = require('../controllers/chat');
const authenticationMiddileware = require('../middileware/authentication');

const router = express.Router();

router.get('/home/chat',authenticationMiddileware.authentication,chatController.users);
router.post('/home/chat',authenticationMiddileware.authentication,chatController.chats)


module.exports = router;