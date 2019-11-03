var express = require('express'); // Express web server framework
var testAPIRouter = require("./controllers/testAPI");
var cors = require("cors");

var app = express();
app.use(cors());
app.use("/testAPI", testAPIRouter);

console.log('Listening on 8888');
app.listen(8888);
