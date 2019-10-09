var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res) {
  res.sendFile('html/index.html', {root: __dirname});
});

app.get('/OK', function(req,res){
  res.send('hello world');
});

app.post('/post', function(req,res) {
  var q = req.body.user;
  var a = req.body.password;
  console.log('User name = ' + q + " , password is " + a);
  res.end('yes');
});

app.listen(8080, function() {
  console.log('Server running on local instance. Port: 8080');
});
