const mongoose = require("mongoose");

const CommentLikeSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostComment",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CommentLike = mongoose.model("CommentLike", CommentLikeSchema);

module.exports = CommentLike;
