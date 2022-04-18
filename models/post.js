const mongoose = require("mongoose");

console.log("Here is before the Post Schema is created", Date.now());
const PostSchema = new mongoose.Schema({
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
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
