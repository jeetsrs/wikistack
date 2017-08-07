'use strict';
var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const chalk = require('chalk');

var models = require('../models');
var Page = models.Page;
var User = models.User;
// ...
router.use('/wiki', wikiRouter);
// or, in one line: router.use('/wiki', require('./wiki'));

router.get('/', function(req, res, next) {
  console.log(chalk.blue('Index page create called'))
  let articles = Page.findAll({
    attributes: ['title','urlTitle']
  })
  // .then(function(abc) {
    // console.log(abc.title)
  // })
  // var templateObj = {
  //   title: foundPage.title,
  //   content: foundPage.content,
  //   status: foundPage.status,
  //   date: foundPage.date
  // }
  res.render('index', articles)


  // res.send('got to GET /');
});

module.exports = router;
