const express = require('express');
const socket = require('socket.io');
const app = express();
const http  = require('http');
const server = http.createServer(app)

//Set up JSON middleware
app.use(express.json());

// Set up Static files
app.use(express.static('public'))

// Set up socket
const io = socket(server);

io.on('connection', (socket) => {
    console.log('socket connection')
    socket.on('message', (msg) => {
        io.sockets.emit('message', (msg))
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})

let port = process.env.PORT || "3000"

server.listen(port, () => console.log(`Listening to PORT ${port}`))
