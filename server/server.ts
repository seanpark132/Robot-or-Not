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

    socket.on("join-room", async (gameId:string) => {       
        socket.join(gameId);            
    }); 

    socket.on("data-to-room", (data: any, purpose: string, room: string) => {   
        
        if (purpose === "new-name") {
            socket.to(room).emit("new-name", data);
        };

        if (purpose === "name-array") {
            socket.to(room).emit("name-array", data);
        };

    })
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});