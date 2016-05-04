var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ item: { text: "this is the TEXT!", something: "jeah!!122" } }));
});

module.exports = router;
