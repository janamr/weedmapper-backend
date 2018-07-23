const express = require('express');
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    // "req.session" is our session object
    console.log(req.session);

    // "req.user" is defined by Passport
    // (it's the result of "passport.deserializeUser()")
    console.log(req.user);

    if (req.user) {
      console.log("LOGGED IN!");
    }
    else {
      console.log("Logged OUT! 😢");
    }

  res.render('index');
});

module.exports = router;
