'use strict';
var express = require('express');
var app = express();
const volleyball = require('volleyball');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');

var makesRouter = require('./routes');
var models = require('./models');

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// Calls for our database connection- to create/sync tables if they don't exist
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    // make sure to replace the name below with your express app
    var server = app.listen(3000, function(){console.log('listening on port 3000');});
})
.catch(console.error);


// start the server
// var server = app.listen(1337, function(){console.log('listening on port 1337');});

// app.use('/', routes)
