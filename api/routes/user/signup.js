var express = require('express');
var passport = require('../../auth');
var router = express.Router();

router.post('/', passport.authenticate('local-signup'), function(req, res, next) {
  var userToSend = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt
  }
  res.status(200).send({
    user: userToSend,
    token: req.token,
    message: "Sign up successful!"
  });
});

module.exports = router;
