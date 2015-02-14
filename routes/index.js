var express = require('express');
var router = express.Router();
var db = require("seraph")({ server: process.env['GRAPHENEDB_URL'] || 'http://localhost:7474'})
var bodyParser = require('body-parser');
var url = require('url');





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'urbinsight' });
});

// router.get('/data', function(req, res, next) {


// router.get('/test', function(req, res, next){
//     console.log("WHYYYYY");
//     res.render('index', {title: 'urbinsight'});
// });

// Data request
router.get('/data', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var node_id = url_parts['query']['node_index'];

    console.log("node id: " + node_id);
    db.read(node_id, function(err, node) {
        res.send(node);
    });
});




// });

module.exports = router;
