const express = require('express');
const app = express();
const http = require('http').server(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, + 'public/index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    socket.on('message', message => {
        console.log('messag: ' + message);
        io.emit('message', message);
    })
});

http.listne(3000, () => {
    console.log('listening on *:3000');
})