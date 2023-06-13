import { Server } from 'socket.io';

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },    
});

io.on("connection", (socket) => {

    socket.on("join-room", (gameId:string) => {
        console.log(`Socket ${socket.id} Joined room ${gameId}`)
        socket.join(gameId);         
    }); 
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});