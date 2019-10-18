// var http = require('http');
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var SpotifyWebAPI = require('spotify-web-api-node');
//
// var scopes = ['user-read-private', 'user-read-email'],
//   redirectUri = 'https://example.com/callback',
//   clientId = '5fe01282e44241328a84e7c5cc169165',
//   state = 'some-state-of-my-choice';
//
// // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
// var spotifyApi = new SpotifyWebApi({
//   redirectUri: redirectUri,
//   clientId: clientId
// });
//
// // Create the authorization URL
// var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
//
// // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
// console.log(authorizeURL);
//
// var credentials = {
//   clientId: 'e2a4f4302abe453294aa6e981bf7280b',
//   clientSecret: '67d234797b30434f85a4358c3968e288',
//   redirectUri: 'http://www.example.com/callback'
// };
//
// var spotifyApi = new SpotifyWebApi(credentials);
//
// // The code that's returned as a query parameter to the redirect URI
// var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';
//
// // Retrieve an access token and a refresh token
// spotifyApi.authorizationCodeGrant(code).then(
//   function(data) {
//     console.log('The token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//     console.log('The refresh token is ' + data.body['refresh_token']);
//
//     // Set the access token on the API object to use it in later calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);
//   },
//   function(err) {
//     console.log('Something went wrong!', err);
//   }
// );
//
// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//   function(data) {
//     console.log('Artist albums', data.body);
//   },
//   function(err) {
//     console.log(err);
//   }
// );
//
//
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());
//
// app.get('/', function(req,res) {
//   res.sendFile('html/index.html', {root: __dirname});
// });
//
// app.get('/', function(req,res){
//   res.send('hello world');
// });
//
// app.post('/post', function(req,res) {
//   var q = req.body.user;
//   var a = req.body.password;
//   console.log('User name = ' + q + " , password = " + a);
//   res.end('yes');
// });
//
// app.listen(8080, function() {
//   console.log('Server running on local instance. Port: 8080');
// });
//
//
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

//Code to give permission to this app to access your spotify account information

var client_id = 'e2a4f4302abe453294aa6e981bf7280b'; // Your client id
var client_secret = '67d234797b30434f85a4358c3968e288'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        console.log('Access Token: ' + access_token);
        console.log('Refresh Token: ' + refresh_token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);
