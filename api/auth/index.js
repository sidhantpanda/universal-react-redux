var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , TokenStrategy = require('passport-accesstoken').Strategy;

var bcrypt   = require('bcrypt-nodejs');
var crypto = require('crypto');

var User  = require('../models/User');
var Token = require('../models/Token');

var tokenOptions = {
  tokenHeader: 'x-auth-token'
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  process.nextTick(function() {
    User.findOne({ 'email' :  email }, function(err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, false);
      } else {
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = generateHash(password);

        newUser.save(function(err, user) {
          if (err)
            throw err;

          var token = new Token({ userId: user._id, key: crypto.randomBytes(64).toString('hex') });
          token.save(function(err, token) {
            if (err)
              return done(err);

            req.token = token;
            return done(null, user, token);
          });
        });
      }
    });
  });
}));

passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, username, password, done) {
  User.findOne({ 'email':  username }).select('+password').exec(function(err, user) {
    if (err)
      return done(err);
    if (!user) {
      return done(null, false);
    } // req.flash is the way to set flashdata using connect-flash

    // if the user is found but the password is wrong
    if (!user.validPassword(password)) {
      return done(null, false); // create the loginMessage and save it to session as flashdata
    }

    // all is well, return successful user
    var token = new Token({ userId: user._id, key: crypto.randomBytes(64).toString('hex') });
    token.save(function(err, token) {
      if (err)
        return done(err);

      req.token = token;
      return done(null, user, token);
    });
  });
}));

passport.use(new TokenStrategy(tokenOptions,
  function (token, done) {
    Token.findOne({key: token}, function (err, token) {
      if (err) {
        console.error('Here1: ', err);
        return done(err);
      }

      // Token not found
      if (!token) {
        console.error('Token not found');
        return done(null, false);
      }

      // Token found but expired
      if (Date.now() > token.expiry) {
        console.error('Token expired');
        return done(null, false);
      } else {
        User.findOne({ '_id' :  token.userId }, function(err, user) {
          if (err) {
            console.error('Here2:', err);
            return done(err);
          }

          if (!user) {
            console.error('User not found');
            return done(null, false);
          } else {
            return done(null, user);
          }
        });
      }
    });
  }
));

module.exports = passport;
