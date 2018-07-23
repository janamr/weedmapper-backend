const passport = require("passport");

const User = require("../models/user-model");

passport.serializeUser((userDoc, done) => {
  // save user's id inside the session
  done(null, userDoc._id);
});

// deserialize: retrieving all the user details from the database
passport.deserializeUser((idFromSession, done) => {
  User.findById(idFromSession)
  .then((userDoc) => {
    done(null, userDoc);
  })
  .catch((err) => {
    done(err);
  });
});

function passportSetup (app) {
  // add passport features to our routes
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    // make "req.user" accessible inside hbs files as "blahUser"
    res.locals.blahUser = req.user;

    next();
  });
}

module.exports = passportSetup;