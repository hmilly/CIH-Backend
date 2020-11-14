const express = require('express')
const rls = require('readline-sync')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
   console.log("running: ", socket.id)

    socket.on("messageEvent", (obj) => {
        io.sockets.emit("messageEvent",  obj)
    })
})


server.listen(3000, () => console.log('66 listening'))