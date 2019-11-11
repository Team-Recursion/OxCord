var express = require('express'); // Express web server framework
var bodyParser = require('body-parser');
var testAPIRouter = require("./controllers/testAPI");
var searchControllerRouter = require("./controllers/searchController");
var cors = require("cors");

var app = express();
app.use(cors());
// parse application/x-www-asdform-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/testAPI", testAPIRouter);
app.use("/searchController", searchControllerRouter);
app.ues("/socketController", socketController);

console.log('Listening on 8888');
app.listen(8888);
