'use strict';
var express = require('express');
var app = express();
const volleyball = require('volleyball');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var path = require('path');

var routes = require('./routes');
var models = require('./models');


var env = nunjucks.configure('views', {
    noCache: true
});
// have res.render work with html files
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(volleyball);

// body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// {force: true}
models.db.sync()
    .then(function () {
        var server = app.listen(3000, function () {
            console.log('listening on port 3000');
        });
    })
    .catch(console.error);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes)


// Error handling - express NEEDS all 4 parameters else it won't know this is an error handler middleware
app.use(function (err, req, res, next){
  console.error(err);
  res.status(500).send(err.message);
})
