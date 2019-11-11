var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
var io = require('socket.io')(server);

server.listen(80);

io.on('connection', function(socket) {

    socket.on('host-join', (data) => {
        socket.join(data.pin);
    })

    socket.on('user-join', (data) => {
        socket.join(data.pin);
    })

    socket.on('add-song', (data) => {
        //add song to database
    })
})

module.exports = router;