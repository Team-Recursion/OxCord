var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
var {google} = require('googleapis');
var youtube = google.youtube({
    version: 'v3',
    auth: "AIzaSyA1jby3cRnc690DQ_GbduBCpWLa_ufAgog"
});

const yehAuth = "AIzaSyC2flXo37atInysZLuWt1dFIYGut4MNzeE"
const jesseAuth = "AIzaSyA1jby3cRnc690DQ_GbduBCpWLa_ufAgog"
const jesseAuth2 = "AIzaSyBLbb_a-FY-CzWjM1lP4OJvEjWgywKuubw"
router.post('/search', function(req,res,next) {
    //const {query} = req.body;
    //const result = "Search Result";

    //var ids = []
    
    youtube.search.list({
        part: 'snippet',
        order: 'relevance',
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
          
          //console.log(data.data);
          //console.log(data.data.items);
          
          //console.log(ids[0]);
          
          res.send(data.data.items);
          
          // res.json({ 
          //   videoId: data.data.items[0].id.videoId,
          //   title: data.data.items[0].snippet.title,
          //   description: data.data.items[0].snippet.description,
          //   thumbnail: data.data.items[0].snippet.thumbnails.default.url
          // })
        }
      });
});

router.post('/searchinfo', function(req,res,next) {
  //const {query} = req.body;
  //const result = "Search Result";
  //console.log('inside search info');
  
  var ids = []

    youtube.videos.list({
      part: 'contentDetails',
      id: 'OG9_cx4Mlks, ndqmvfofqyI, kbjhO3iX1GY, eBmAkIdLWYs, rTb1LWEpek4'     
    }, function (err, data) {
      if (err) {
        console.error('Details failed retrieval' + err);
      }
      if (data) {
        // console.log(data.data.items[0].id.videoId);
        // console.log(data.data.items[0].snippet.title);
        // console.log(data.data.items[0].snippet.description);
        // console.log(data.data.items[0]);
        // console.log(data.data.items[0].snippet.thumbnails.default.url);
        
        length = [
              data.data.items[0].contentDetails.duration,
              data.data.items[1].contentDetails.duration,
              data.data.items[2].contentDetails.duration,
              data.data.items[3].contentDetails.duration,
              data.data.items[4].contentDetails.duration
            ]

        //console.log(length);
        //console.log(data.data.items);
        
        
        //res.send(data.data.items);
        
        // res.json({ 
        //   videoId: data.data.items[0].id.videoId,
        //   title: data.data.items[0].snippet.title,
        //   description: data.data.items[0].snippet.description,
        //   thumbnail: data.data.items[0].snippet.thumbnails.default.url
        // })
      }
    });
});

module.exports = router;
