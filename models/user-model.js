const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  realName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/
  },
  encryptedPassword: { type: String, required: true },
  userComments: [
    { type: Schema.Types.ObjectId, ref: 'Comments' }
  ],
  userPins: [
    { type: Schema.Types.ObjectId, ref: 'Comments' }
  ],
  imageUrl: { type: String },
  description: { type: String },
  userFavorites: { type: String }


}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;