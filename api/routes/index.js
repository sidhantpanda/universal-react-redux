var express = require('express');
var router = express.Router();

var passport = require('../auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', passport.authenticate('token', {session: false}), function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).send({
    data: 'something',
  });
});

module.exports = router;
