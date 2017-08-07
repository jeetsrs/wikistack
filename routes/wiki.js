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
  // console.log(chalk.blue('URL Title: ', req.body.urlTitle));
  // //OPTION1: req.body has all the tags, so we don't need to make a new object
  // var page = Page.build(req.body);

  // //OPTION2: The above works as well as the option below - but is cleaner
  //   // var page = Page.build({
  //   //   title: req.body.title,
  //   //   content: req.body.contents,
  //   //   status: req.body.pageStatus,
  //   // });

  // var user = User.build({
  //   name: req.body.authorName,
  //   email: req.body.authorEmail
  // });

  // page.save().then(user.save()).then(function (savedPage) {
  //   res.redirect(savedPage.route); // route virtual FTW
  // }).catch(function (err) {
  //   next(err);
  // });

  User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
      });

      return page.save().then(function (page) {
      return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);

});

router.get('/add', function (req, res, next) {
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
      where: {
        urlTitle: req.params.urlTitle
      },
      include: [
        {model: User, as: 'author'}
      ]
    })
    .then(function (page) {
      if (page === null) {
          res.status(404).send();
      } else {
          res.render('wikipage', {
              page: page
          });
      }
    })
    .catch(next);
});

module.exports = router;
