const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantPinSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",  // tells Mongoose that this ID connects to the User model
    required: true
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  access: { type: String, enum: ['Public', 'Private', 'Unknown']},
  availability: {
    startDate: String,
    stopDate: String
  },
  details: { type: String }
}, {
  timestamps: true
});

const PlantPin = mongoose.model("PlantPin", plantPinSchema);

module.exports = PlantPin;