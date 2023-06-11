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


 