const jwt = require('jsonwebtoken');

const User = require('../models/signup');


exports.authentication = (req,res,next) =>{
    try{
        const token = req.header("Authentication");
        const decoded = jwt.verify(token,"f244c652502fdfa22f797cd8bea18894c943939899feb0f6b85cfba16d41e6419224d4894b9f622ae6a3ac2f3b7ef8cdf674f21ecb728c47f6276839f711244c");
        req.user = decoded;
        req.valid = true
        next();
    }
    catch(err){
        req.valid = false;
        res.json({success:false,message: "Authentication denied",isAlive: false})
    }

}