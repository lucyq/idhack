var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
// var neo4j = require('node-neo4j');

// var db = new neo4j.GraphDatabase(
//         process.env['GRAPHENEDB_URL'] ||
//         'http://localhost:7474'
// );

var db = require("seraph")({ server: process.env['GRAPHENEDB_URL'] || 'http://localhost:7474'})

db.save({ name: "Test-Man", age: 40}, function(err, node) {
    if (err) throw err;
    console.log(node);
    console.log("Test-Man inserted", node.id);

    db.delete(node, function(err) {
        if (err) throw err;
        console.log("Test-Man away!");
    });
});


var app = express();


// node-neo4j test
// var db = new neo4j(process.env['GRAPHENEDB_URL'] || 'http://localhost:7474');


// var node = db.insertNode({hello: 'world'},     // instantaneous, but...
//     function (err, node) {    // ...this is what actually persists.
//     if (err) {
//         console.error('Error saving new node to database:', err);
//     } else {
//         console.log('Node saved to database with id:', node._id);
//     }
// });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname + '/views')));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
