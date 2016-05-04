var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var json_object = {
        "item": [
           {
             "text": "production-web-1: NOT RESPONDING",
             "type": 1
           }
         ]
    };
    res.send(JSON.stringify(json_object));
});

module.exports = router;
