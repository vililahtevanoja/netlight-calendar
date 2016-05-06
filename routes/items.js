var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var json_object = {
        "item": [
           {
             "text": "<strong>Something here!</strong>",
             "type": 123456789
           }
         ]
    };
    res.send(JSON.stringify(json_object));
});

module.exports = router;
