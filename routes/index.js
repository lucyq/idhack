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

	// ADD A RELATIONSHIP
	// db.relate(1, 'knows', 2, { for: '2 months' }, function(err, relationship) {
 //  		assert.deepEqual(relationship, {
 //    		start: 1,
	// 	    end: 2,
	// 	    type: 'knows',
	// 	    properties: { for: '2 months' },
	// 	    id: 1
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

router.get('/data/node_info', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	var node_id = url_parts['query']['node_index'];

  	
    	db.nodesWithLabel('Location', function(err, results) {
    		console.log("RESULTS: " + results);
      		res.send([results]); // -> 'DS4'
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
