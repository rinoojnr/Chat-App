const io = require('socket.io')(3000,{
    cors: {
        origin: "*",
    },
});

io.on('connection',socket=>{
    socket.on('group-chat-send', (groupId)=> {
        socket.broadcast.emit('group-message',groupId);
    })
})



const socketService = (socket) => {
    socket.on('common-chat-send', ()=> {
        
            socket.broadcast.emit('common-chat');
    })
    socket.on('group-chat-send', (groupId)=> {
        socket.broadcast.emit('group-message',groupId);
    })
  }

module.exports = socketService
