var express = require('express');
var router = express.Router();
var db = require("seraph")({ server: process.env['GRAPHENEDB_URL'] || 'http://localhost:7474'})
var bodyParser = require('body-parser');
var url = require('url');
var assert = require('assert');




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
router.get('/data/relationships', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var node_id = url_parts['query']['node_index'];


	// db.relate(46, 'stream', 49, { for: 'up' }, function(err, relationship) {
 //  		assert.deepEqual(relationship, {
 //    		start: 46,
	// 	    end: 49,
	// 	    type: 'stream',
	// 	    properties: { for: 'up' },
	// 	    id: 7
	// 	});
	// });

    db.relationships(node_id, 'all', function(err, relationships) {
    	res.send(relationships);
    });

    // RETURNS INFO ABOUT NODE
    // db.read(node_id, function(err, node) {
    // 	db.rel.read()
    //     res.send(node);
    // });
});

router.get('/data/infoByNode', function(req,res,next){
	var url_parts = url.parse(req.url, true);
	var node_id = url_parts['query']['node_index'];	

	db.read(node_id, function(err, node) {
		res.send(node);
	});
});


router.get('/data/infoByLabel', function(req, res, next) {

    	db.nodesWithLabel('Location', function(err, results) {
      		res.send(results); // -> 'DS4'
    	});
  	
	// var data_arr = [];
// 	for 
// 	db.read(node_id, function(err, node) {
// 		data_arr.push(node); 
// //        res.send(node);
//     });
});




// });

module.exports = router;
