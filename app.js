const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
// const dotenv = require('dotenv');

const signupRouter = require('./routes/signup');

const app = express();

// dotenv.config();


app.use(cors({
    origin: "*",
    // method: ["POST"]
}));
app.use(bodyParser.json())

app.use(signupRouter);


sequelize.sync()
.then(()=>{
    app.listen(3000,()=>console.log("listen to the port 3000"));
})
.catch((err)=>console.log(err,"sequelize error"))
