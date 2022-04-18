const mongoose = require("mongoose");

const PostCommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const PostComment = mongoose.model("PostComment", PostCommentSchema);

module.exports = PostComment;