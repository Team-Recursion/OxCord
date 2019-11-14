var express = require('express'); // Express web server framework
var bodyParser = require('body-parser');
var testAPIRouter = require("./controllers/testAPI");
var searchControllerRouter = require("./controllers/searchController");
var cors = require("cors");

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var socketController = require('./controllers/socketController');
app.use(cors());
// parse application/x-www-asdform-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Credentials', true);
});

// parse application/json
app.use(bodyParser.json())

app.use("/testAPI", testAPIRouter);
app.use("/searchController", searchControllerRouter);

socketController.startCommunication(io);

console.log('Listening on 8888');
http.listen(8888);
