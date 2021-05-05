require("dotenv").config();

//* Tools
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const initializePassport = require("./routes/passport-config");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const { User } = require("./models");
const es6Renderer = require("express-es6-template-engine");

const PORT = 3033;

//* Middleware
// comment
app.use(cors());
app.use(express.json())
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

initializePassport(passport)
app.use(passport.initialize());
app.use(passport.session());

app.engine("html", es6Renderer);
app.set("views", "../views");
app.set("view engine", "html");

app.use(express.static("../public"));

app.use(express.urlencoded({ extended: false }));


// CUSTOM MIDDLEWARE
function checkAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

function checkIfUserIsLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return res.redirect("/") 
  }

  next()
}

app.get("/", (req,res) => {
  res.render("home-page");
});

app.get("/login", checkIfUserIsLoggedIn,(req,res) => {
  res.render("login");
});

app.post("/login", 
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login' 
  }),
  function(req, res) {
    res.json();
});

app.get("/register", checkIfUserIsLoggedIn,(req,res) => {
  res.render("register");
});

app.post("/register", async (req,res) => {
  console.log(req.body)
  try {
    const salt = await bcrypt.genSalt();
    const Password = await bcrypt.hash(req.body.Password, salt);
    const { UserName,FirstName,LastName,DOB,Address,Email } = req.body;
    const newUser = await User.create({
      UserName,
      Password,
      FirstName,
      LastName,
      DOB,
      Address,
      Email
    });

    res.status(200).redirect("/login");
  } catch (error) {
    res.status(401).redirect("/register")
  }
});

app.post("/logout", (req,res) => {
  req.logOut();
  res.redirect("/login");
})

app.get("/note", (req,res) => {
  res.render("notes-page");
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})