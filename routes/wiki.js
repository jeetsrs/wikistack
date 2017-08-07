'use strict';
var express = require('express');
var router = express.Router();
const  chalk  =  require('chalk');
// const views = require('../views');

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {
  console.log(chalk.blue('URL Title: ', req.body.urlTitle));
  var page = Page.build({
    title: req.body.title,
    content: req.body.contents,
    status: req.body.pageStatus,
  });
  var user = User.build({
    name: req.body.authorName,
    email: req.body.authorEmail
  });
  page.save().then(user.save()).then(function (savedPage) {
    res.redirect(savedPage.route); // route virtual FTW
  }).catch(next);
});

router.get('/add', function (req, res, next) {
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      }
    })
    .then(function (foundPage) {
      // res.json(foundPage);
      var templateObj = {
        title: foundPage.title,
        content: foundPage.content,
        status: foundPage.status,
        date: foundPage.date
      }
      res.render('wikipage', templateObj)
    })
    .catch(next);
});


module.exports = router;
