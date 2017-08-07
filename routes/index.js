'use strict';
var express = require('express');
var router = express.Router();
const client = require('../db');
// var tweetBank = require('../tweetBank');


// a reusable function
router.get('/', function (req, res) {
  console.log('reached render for /');
  res.render('index', {
    // Title: "This page works!! YAAAA!!"
  });
});

// ADD ALL REQUIRED ROUTES BELOW THIS LINE


module.exports = router;
