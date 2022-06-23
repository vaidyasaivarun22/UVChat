const express = require('express');
const path= require('path');
const app = express();
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const server = http.createServer(app);
const io = socketio(server); 

// set static folder
app.use(express.static(path.join(__dirname,'public')));

// runs when client connects
const users={};

io.on('connection',socket=>{

    socket.on('new-user-joined',name =>{
        // console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})




PORT = 3000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})