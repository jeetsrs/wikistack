'use strict';
var express = require('express');
var router = express.Router();
const chalk = require('chalk');
// const views = require('../views');


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  // res.send('got to POST /wiki/');
  res.json(req.body)
});

router.get('/add', function(req, res, next) {
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});


module.exports = router;
