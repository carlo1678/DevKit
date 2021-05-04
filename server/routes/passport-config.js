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
    

    // const user = await User.FindOne({
    //   where: req.body
    // })
    // // if the user in not in the db, error out
    // if (user == null) {
    //   return done(null, false, { message: "No user with that username" });
    // }
    // try {
    //   if (await bcrypt.compare(password, user.Password)) {
    //     return done(null, user)
    //   } else {
    //       return done(null, false, {
    //         message: "Password does not match in our db"
    //       })
    //   }
    // } catch (error) {
    //   console.error(error)
    //   return done(error)
    // }
  };
  passport.use(new localStrategy(authenticateUser));
  // this logs you in as a user and creates a session
  passport.serializeUser((user, done) => done(null, user.id));
  // this unlogs that session
  passport.deserializeUser((id, done) => {
    return done(null, userId(id));
  })
}

module.exports = initialize;