'use strict';
var express = require('express');
var router = express.Router();
const  chalk  =  require('chalk');
var models = require('../models');
var Page = models.Page;
var User = models.User;

// router.get('/:id', function(req, res, next) {
//   Page.findAll({
//     where: {
//         authorId: req.params.id
//       }
//   }).then(function(wikiPages){
//     res.render('index', { articles: wikiPages });
//   }).catch(next);
// });


router.get('/:userId', function(req, res, next) {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('user', { user: user, pages: pages });
  })
  .catch(next);

});

router.get('/', function(req, res, next) {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});


module.exports = router;
