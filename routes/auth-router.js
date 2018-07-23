const express = require("express")
const bcrypt = require("bcrypt");
const passport = require("passport");


const User = require("../models/user-model.js");

const router = express.Router();

// router.get("/signup", (req, res, next) => {
//   res.render("auth-views/signup-form.hbs");
// });
// these routes are supposed to be APIs ... readable by any program
// POST /signup
router.post("/process-signup", (req, res, next) => {
  const { username, realName, email, originalPassword } = req.body;

  if (originalPassword === "" || originalPassword.match(/[0-9]/) === null) {
    // bad password (is blank or doesn't have anumber)
    // create an error object for "next(err)"
    const err = new Error("Password must have a number");
    next(err);
    return;
  }

  // we're ready to save the user if we get this far
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  // must submit these same names in postman

  User.create({ username, realName, email, encryptedPassword })
  .then((userDoc) => {
    req.login(userDoc, () => {
      // hide encryptedPassword before sending the JSEON (it's a security risk)
      userDoc.encryptedPassword = undefined;
      res.json({ userDoc });
    });
  })
  .catch((err) => {
    next(err);
  });

});

// router.get("/login", (req, res, next) => {
//   res.render("auth-views/login-form.hbs");
// });
// POST /login
router.post("/login", (req, res, next) => {
  const { email, loginPassword } = req.body;
console.log(req.body)
  // check the email by searching the database
  User.findOne({ email }) // find user by email
  .then((userDoc) => {
    if (!userDoc) {
      const err = new Error("Email not found");
      next(err);
      return;
    }
    // we are ready to check the password if we get this far
    const { encryptedPassword } = userDoc;
    if (!bcrypt.compareSync(loginPassword, encryptedPassword)) {
      const err = new Error("Wrong password");
      next(err);
      return;
    }
    // ready to LOG THEM IN if we get this far
    req.logIn(userDoc, () => {
      userDoc.encryptedPassword = undefined;
      res.json({ userDoc });
    //  res.redirect('/');
    });
  })
  .catch((err) => {
    next(err);
  });
});

// DELETE /logout
router.delete("/logout", (req, res, next) => {
  req.logOut();
  res.json({ userDoc: null });
});


// GET ???
// to ask the server if we're logged in
router.get("/checklogin", (req, res, next) => {
  if (req.user) {
    // hide encrypted password before sending the JSON (it's a security risk)
    req.user.encryptedPassword = undefined;
  }
  res.json({ userDoc: req.user });
});

module.exports = router;