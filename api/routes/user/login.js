var express = require('express');
var passport = require('../../auth');
var router = express.Router();

router.post('/', passport.authenticate('local-login', { failWithError: true }), function (req, res, next) {
  // Drop the password field in the response
  res.status(200).send({
    user: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt
    },
    token: req.token
  });
}, function(err, req, res, next) {
  console.error(err);
  return res.status(403).send(err);
});

module.exports = router;
