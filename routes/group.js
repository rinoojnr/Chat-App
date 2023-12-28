const express = require('express');

const groupController = require('../controllers/group');
const authenticationMiddileware = require('../middileware/authentication');
const multerMiddleware = require('../middileware/multer')
const upload = multerMiddleware.multer.single('image');


const router = express.Router();

router.get('/home/group/create',authenticationMiddileware.authentication,groupController.getUsers);
router.post('/home/group/create',authenticationMiddileware.authentication,groupController.createGroup);
router.post('/home/group/sendmessage',authenticationMiddileware.authentication,upload,groupController.sendGroupMessage);
router.get('/home/group/getmessage',authenticationMiddileware.authentication,groupController.getGroupMessage);
router.post('/home/group/edit',authenticationMiddileware.authentication,groupController.editGroup);
router.get('/home/group/information',authenticationMiddileware.authentication,groupController.getGroupInfo)


module.exports = router;