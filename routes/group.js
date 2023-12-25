const express = require('express');

const groupController = require('../controllers/group');
const authenticationMiddileware = require('../middileware/authentication');


const router = express.Router();

router.get('/home/group/create',authenticationMiddileware.authentication,groupController.getUsers);
router.post('/home/group/create',authenticationMiddileware.authentication,groupController.createGroup);
router.post('/home/group/sendmessage',authenticationMiddileware.authentication,groupController.sendGroupMessage);
router.get('/home/group/getmessage',authenticationMiddileware.authentication,groupController.getGroupMessage);
router.post('/home/group/edit',authenticationMiddileware.authentication,groupController.editGroup);


module.exports = router;