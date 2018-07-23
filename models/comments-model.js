const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  userPhoto: { type: String, required: true },
  userName: { type: String, required: true },
  userComment: { type: String, required: true },
}, {
  timestamps: true
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;