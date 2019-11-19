var express = require('express'); // Express web server framework
var bodyParser = require('body-parser');
var searchControllerRouter = require("./controllers/searchController");
var dbController = require("./controllers/dbController");
var path = require('path');
var cors = require("cors");

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var socketController = require('./controllers/socketController');
app.use(cors());
// parse application/x-www-asdform-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//never returns causes problems for search calls

// app.use(function(req,res,next) {
//     res.header('Access-Control-Allow-Credentials', true);
// });
// parse application/json
app.use(bodyParser.json())
app.use("/dbController", dbController);
app.use("/searchController", searchControllerRouter);

app.use(express.static(path.join(__dirname, '../../frontend/src/build')));
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../frontend/src/build', 'index.html'))
})

socketController.startCommunication(io);

console.log('Listening on 8080');
http.listen(8080);
