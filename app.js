var http = require('http');
var express = require('express');
var app = express();

app.get('/OK', function(req,res){
  res.send('hello world');
})

app.post('/post', function(req,res) {
  res.send('Post request');
})

app.listen(8080);
console.log('Server running on local instance. Port: 8080');
