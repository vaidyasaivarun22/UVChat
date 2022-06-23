const express = require('express');
const path= require('path');
const app = express();
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const server = http.createServer(app);
const io = socketio(server); 

// set static folder to connect between the server and the frontend 
app.use(express.static(path.join(__dirname,'public')));

const users={};

// runs when client connects
io.on('connection',socket=>{

    socket.on('new-user-joined',name =>{
        // console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);//This is the message sent to all the users except the one that has joined.(broadcast for reason used)
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]}) //This is the message sent to all the users except the one that has messagged.
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]); //This is the message sent to all the users except the one that has left.
        delete users[socket.id];
    })
})




const PORT = process.env.PORT || 3000 ;

server.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})