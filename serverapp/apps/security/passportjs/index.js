const passport      = require('passport'),
LocalStrategy       = require('passport-local').Strategy,
User                = require('../../../dbconfig/models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
        usernameField: 'email',
      },
      function(username, password, done) {
        User.findOne({ username: username }, async function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Неправельный почтовый адресс' });
          }
          var resultOfPasswordCheck = await user.validPassword(password);
          if (!resultOfPasswordCheck) {
            return done(null, false, { message: 'Неправельный пароль' });
          }
          return done(null, user);
        });
      }
    ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
};