// server configs
const express = require("express")
const morgan = require("morgan")
const routes = require("./routes")
const db = require("./db")
const PORT = 3001

const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const path = require("path");

const {User} = require("./models");

const app = express()

app.use(helmet());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cookieParser());

app.use(
  sessions({
    secret: "omdb",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }

            return done(null, user); 
          });
        })
        .catch(done); 
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public", "index.html"));
// });

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', routes)
morgan("combined")

db.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on: http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })