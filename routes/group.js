const express = require('express');

const groupController = require('../controllers/group');
const authenticationMiddileware = require('../middileware/authentication');


const router = express.Router();

router.get('/home/group/create',authenticationMiddileware.authentication,groupController.getUsers);
router.post('/home/group/create',authenticationMiddileware.authentication,groupController.createGroup)


module.exports = router;