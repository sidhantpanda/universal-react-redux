var express = require('express');
var router = express.Router();

var signup = require('./signup');
var login = require('./login');
// var login = require('./login');

router.use('/signup', signup);
router.use('/login', login);
// router.use('/login', login);

module.exports = router;
