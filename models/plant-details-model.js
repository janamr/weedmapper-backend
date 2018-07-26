const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantDetailsSchema = new Schema({
  commonName: { type: String, required: true },
  scientificName: { type: String, required: true },
  images: [
    { type: String, required: true }
  ],
  description: { type: String },
  userComments: [
    { type: Schema.Types.ObjectId, ref: 'Comments' }
  ]
  }, {
  timestamps: true
});

const PlantDetails = mongoose.model("PlantDetails", plantDetailsSchema);

module.exports = PlantDetails;