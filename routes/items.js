var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var JSON = {
        "item": [
           {
             "text": "production-web-1: NOT RESPONDING",
             "type": 1
           }
         ]
    };
    res.send(JSON.stringify(JSON));
});

module.exports = router;
