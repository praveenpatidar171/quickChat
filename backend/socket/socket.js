const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5173'],
        methods: ['GET', 'POST'],
    }
});

const getRecevierSocketId = (userId) => {
    return userSocketMap[userId];
}

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));



    socket.on('disconnected', () => {
        console.log('User disconnected', socket.id);
        const userId = Object.keys(userSocketMap).find(
            (key) => userSocketMap[key] === socket.id
        );
        if (userId) {
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });

});

module.exports = { app, io, server, getRecevierSocketId };