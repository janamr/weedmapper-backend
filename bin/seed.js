const mongoose = require("mongoose");
const Comments = require("../models/comments-model.js");
const PlantDetails = require("../models/plant-details-model.js");
const PlantPin = require("../models/plant-pin-model.js");
const User = require("../models/user-model.js");



// connect to database
// this same chunk is in app.js
mongoose.Promise = Promise;
mongoose // make sure to connect to same DB as in app.js
  .connect('mongodb://localhost/weedmapper-backend', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// book.create query saves this all to the DB
// create array of data
const plantPinData = [
{
  location: {
    "latitude": 48.903363,
    "longitude": 2.326891
  },
  name: "Stinging Nettle",
  imageUrl: "https://northernwoodlands.org/images/articles/nettle1.jpg",
  access: 'Public',
  availability: {
    "startDate": "January",
    "stopDate": "December"
  },
  details: "Growing wild in the community garden. Do the gardeners a favor and clear their weeds. Definitely wear gloves! Then make tea, soup, or eat sauteed."
},
{
  location: {
    "latitude": 48.825775,
    "longitude": 2.371498
  },
  name: "Purslane",
  imageUrl: "http://cdn.naturallifeenergy.com/wp-content/uploads/2016/08/purslane-weed.jpg",
  access: 'Public',
  availability: {
    "startDate": "January",
    "stopDate": "December"
  },
  details: "Succulenty. Growing wild in the community garden. Do the gardeners a favor and take it away."
},
{
  location: {
    "latitude": 48.871855,
    "longitude": 2.311014
  },
  name: "Mint",
  imageUrl: "https://cdn3.volusion.com/wkav7.pckj3/v/vspfiles/photos/HER-MT08-2.jpg?1406809798",
  access: 'Private',
  availability: {
    "startDate": "January",
    "stopDate": "December"
  },
  details: "On WeWork rooftop. Be discreet when taking. Must be a member or know somebody to get in."
},

];

// const plantDetailsData = [
//   {
//     commonName: "Stinging Nettle",
//     scientificName: "Urtica dioica",
//     images: [
//       "https://northernwoodlands.org/images/articles/nettle1.jpg",
//       "",
//       "",
//       ""
//     ],
//     details: "Grows basically everywhere. Stings on contact. Leaves are edible.",
//     userComments: "Try these recipes! [{ type: Schema.Types.ObjectId, ref: 'Comments' }] "
//   },
//   {
//     commonName: "Common Name",
//     scientificName: "Scientific name",
//     images: [
//       "https://northernwoodlands.org/images/articles/nettle1.jpg",
//       "",
//       "",
//       ""
//     ],
//     details: "Lush and green",
//     userComments: "Try these recipes! [{ type: Schema.Types.ObjectId, ref: 'Comments' }] "
//   },
//   ];

plantPinData.forEach((onePin) => {
  PlantPin.create(onePin)
  .then((plantPinDoc) => {
    console.log('newly creaed plant =========================');
    console.log(plantPinDoc);
  })
  .catch((err) => {
    console.log("Create FAIL", err);
  });
});

// plantDetailsData.forEach((onePlant) => {
// });

// userData.forEach((onePin) => {
// });

// commentsData.forEach((onePin) => {
// });
