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
    console.log(req.body);
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
          console.log(data.data.items[0].id.videoId)
          res.send(data.data.items[0].id.videoId);
        }
      });
});

module.exports = router;
