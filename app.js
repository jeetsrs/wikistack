'use strict';
var express = require('express');
var app = express();
const volleyball = require('volleyball');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');

var routes = require('./routes');
var models = require('./models');


var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(volleyball);

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// {force: true}
models.db.sync()
.then(function () {
    // make sure to replace the name below with your express app
    var server = app.listen(3000, function(){console.log('listening on port 3000');});
})
.catch(console.error);

app.use('/', routes)
