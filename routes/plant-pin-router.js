const express = require("express");

const User = require('./../models/user-model');
const PlantPin = require("../models/plant-pin-model.js");

const router = express.Router();

router.get("/plantPin/add", (req, res, next) => {
  if (!req.user) {
    // redirect away if you aren't logged in (authorization!)
    res.redirect("/login");
    return;
  }
  res.render("plant-views/plant-form.hbs");
});

router.post("/process-plantPin",
  (req, res, next) => {
    if (!req.user) {
      // redirect away if you aren't logged in (authorization!)
      res.redirect("/");
      return;
    }

    const { name, description, imageUrl, latitude, longitude } = req.body;

    PlantPin.create({
      owner: req.user._id,
      imageUrl,
      name,
      description,
      latitude,
      longitude
    })
    .then((plantPinsDoc) => {
      console.log(req.user);
      console.log(plantPinsDoc);
      User.update(
        { _id: req.user._id },
        { $push: { userPins: plantPinsDoc._id}}
      )
      .then(() =>{
        res.json(plantPinsDoc);
      })
    })
    .catch((err) => {
      next(err);
    })
  });

// ---------//-----------//-------------//-------------//

router.get("/userPins", (req, res, next) => {
  PlantPin
  .find({ owner: req.user._id })
  .sort({ createdAt: -1 })
  .then((plantPinResults) => {
    res.json(plantPinResults);
  })
  .catch((err) => {
    next(err);
  });
});

router.get("/allPins", (req, res, next) => {
  PlantPin
  .find()
  .sort({ createdAt: -1 })
  .then((plantPinResults) => {
    res.json(plantPinResults);
  })
  .catch((err) => {
    next(err);
  });
});

router.get("/plantPin/:id", (req, res, next) => {
  const { id } = req.params;

  PlantPin.findById(id)
  .then((plantPinDoc) => {
    if (!plantPinDoc) {
      // show 404 if no phone was found
      next();
      return;
    }

    res.json(plantPinDoc);
  })
  .catch((err) => {
    next(err);
  });
});

//----------//----------//----------//---------//

router.delete("/plantPin/:id", (req, res, next) => {
  const { id } = req.params;

  PlantPin.findByIdAndRemove(id)
  .then((plantPinDoc) => {
    res.json(plantPinDoc);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;