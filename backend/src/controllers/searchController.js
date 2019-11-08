var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');

router.post('/search', function(req,res,next) {
    //const {query} = req.body;
    console.log(req.body);
    const result = "Search Result";
    res.send(result);
});

module.exports = router;
