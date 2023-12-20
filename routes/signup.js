const express = require('express');

const signUpController = require('../controllers/signup');


const router = express.Router();

router.post('/user/signup',signUpController.signUp);
router.post('/user/login',signUpController.login);


module.exports = router;