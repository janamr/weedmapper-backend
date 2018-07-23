const express = require("express");

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
    // create the geoJSON structure for our lat and long
    // const location = { coordinates: [ latitude, longitude ] };

    PlantPin.create({
      owner: req.user._id,
      imageUrl,
      name,
      description,
      latitude,
      longitude
    })
    .then((plantPinDoc) => {
      res.redirect("plantPinDoc");
    })
    .catch((err) => {
      next(err);
    })
  });

// router.get("/my-rooms", (req, res, next) => {
//   if (!req.user) {
//     // "req.flash()" is defined by the "connect-flash" package
//     req.flash("error", "You must be logged in.");
//     // redirect away if you aren't logged in (authorization!)
//     res.redirect("/login");
//     return;
//   }

//   Room.find({ owner: req.user._id })
//     .then((roomResults) => {
//       res.locals.roomArray = roomResults;
//       res.render("room-views/room-list.hbs");
//     })
//     .catch((err) => {
//       next(err);
//     });
// });


// module.exports = router;


// ---------//-----------//-------------//-------------//

router.get("/plantPins", (req, res, next) => {
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

router.post("/plantPins", (req, res, next) => {
  const { location, name, image, details } = req.body;

  PlantPin.create({ location, name, image, details })
  .then((plantPinsDoc) => {
    // res.locals.plantPinsArray = plantPinsDoc;
    res.render("plant-views/plant-list.hbs")
    res.json(plantPinsDoc)
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

router.put("/plantPin/:id", (req, res, next) => {
  const { id } = req.params;
  const { location, name, image, details } = req.body;

  PlantPin.findByIdAndUpdate(
    id,
    { $set: { location, name, image, details } },
    // "new" gets us the updated version of the document
    { runValidators: true, new: true }
  )
  .then((plantPinDoc) => {
    res.json(plantPinDoc);
  })
  .catch((err) => {
    next(err);
  });
});

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