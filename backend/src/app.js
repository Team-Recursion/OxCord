var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var Spotify = require('node-spotify-api');

var client_id = 'e2a4f4302abe453294aa6e981bf7280b'; // Your client id
var client_secret = '67d234797b30434f85a4358c3968e288'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var app = express();

var spotify = new Spotify({
  id: client_id,
  secret: client_secret
});

app.get('/search', function(req,res) {
  spotify.search({type:'track', query: 'Hello'}, function(err, data) {
    if(err) {
      return console.log('Error occurred: ' + err);
    }
    res.send(data)
  });
})

console.log('Listening on 8888');
app.listen(8888);
