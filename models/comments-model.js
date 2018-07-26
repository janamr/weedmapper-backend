const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  plantPin: { type: Schema.Types.ObjectId, ref: "PlantPin", required: true },
  userComment: { type: String, required: true },
}, {
  timestamps: true
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;