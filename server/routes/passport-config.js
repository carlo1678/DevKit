const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");

function initialize(passport) {
  
  const authenticateUser = async (username, password, done) => {

    try {
      const user = await User.findOne( {where: { UserName: username }})
      if (user == null) {
        return done(null, false);
      }
      
      if (await bcrypt.compare(password, user.Password)) {
        return done(null, user)
      } else {
          return done(null, false, {
            message: "Password does not match in our db"
          })
      }
    } catch (error) {
      console.error(error)
      return done(error)
    }
    
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