'use strict';
var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const chalk = require('chalk');
// ...
router.use('/wiki', wikiRouter);
// or, in one line: router.use('/wiki', require('./wiki'));

router.get('/', function(req, res, next) {
  console.log(chalk.blue('Index page create called'))
  res.send('got to GET /');
});

module.exports = router;
