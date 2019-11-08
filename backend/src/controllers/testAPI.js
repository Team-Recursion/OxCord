var express = require("express");
var router = express.Router();

router.get('/', function(req,res,next) {
  res.send("API is working properly");
});

router.post('/submit', function(req, res) {

})

module.exports = router;
