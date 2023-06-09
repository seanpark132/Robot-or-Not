import {Server} from 'socket.io';

declare var require: any;

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },    
});


 