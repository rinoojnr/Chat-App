const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const cronService = require('./services/crone');
cronService.job.start()

// const dotenv = require('dotenv');

const User = require('./models/signup');
const Chat = require('./models/chat');
const Groups = require('./models/group');
const GroupMember = require('./models/groupmember');
const GroupChat = require('./models/groupchat');
const Content = require('./models/content');
// const Archived = require('./models/archivedchat');

const signupRouter = require('./routes/signup');
const chatRouter = require('./routes/chat');
const groupRouter = require('./routes/group');

const app = express();

// dotenv.config();


app.use(cors({
    origin: "*",    
    // method: ["POST"]
}));
app.use(bodyParser.json())

app.use(signupRouter);
app.use(chatRouter);
app.use(groupRouter);


User.hasMany(Chat);
Chat.belongsTo(User);


// User.hasMany(Groups);
// Groups.belongsTo(User);
User.hasMany(GroupMember)
GroupMember.belongsTo(User)

Groups.hasMany(GroupMember)
GroupMember.belongsTo(Groups)



sequelize.sync()
.then(()=>{
    app.listen(3001,()=>console.log("listen to the port 3001"));
})
.catch((err)=>console.log(err,"sequelize error"))
