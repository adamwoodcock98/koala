const mongoose = require("mongoose");

const PostLikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const PostLike = mongoose.model("PostLike", PostLikeSchema);

module.exports = PostLike;
