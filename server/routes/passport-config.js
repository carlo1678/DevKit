const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");

function initialize(passport) {
  
  const authenticateUser = async (username, password, done) => {

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
    
  };
  passport.use(new localStrategy(authenticateUser));
  // this logs you in as a user and creates a session
  passport.serializeUser((user, done) => done(null, user.id));
  // this unlogs that session
  passport.deserializeUser(function(user, done) { 
    done(null, user); 
});
}

module.exports = initialize;