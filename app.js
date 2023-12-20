const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const signupRouter = require('./routes/signup');

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.use(signupRouter);


sequelize.sync()
.then(()=>{
    app.listen(3000,()=>console.log("listen to the port 3000"));
})
.catch((err)=>console.log(err,"sequelize error"))
