var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
var {google} = require('googleapis');
var youtube = google.youtube({
    version: 'v3',
   auth: "AIzaSyA1jby3cRnc690DQ_GbduBCpWLa_ufAgog"
});

router.post('/search', function(req,res,next) {
    //const {query} = req.body;
    //const result = "Search Result";

    youtube.search.list({
        part: 'snippet',
        order: 'viewCount',
        q: req.body.value,
        type: 'video'
      }, function (err, data) {
        if (err) {
          console.error('Error: ' + err);
        }
        if (data) {
          // console.log(data.data.items[0].id.videoId);
          // console.log(data.data.items[0].snippet.title);
          // console.log(data.data.items[0].snippet.description);
          // console.log(data.data.items[0]);
          // console.log(data.data.items[0].snippet.thumbnails.default.url);
          
          // res.send(data.data.items[0].id.videoId);
          console.log(data);
          
          res.json({ 
            videoId: data.data.items[0].id.videoId,
            title: data.data.items[0].snippet.title,
            description: data.data.items[0].snippet.description,
            thumbnail: data.data.items[0].snippet.thumbnails.default.url
          })
        }
      });
});

module.exports = router;
