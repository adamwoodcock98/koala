const mongoose = require("mongoose");

// console.log(mongoose);

mongoose.connect("mongodb://127.0.0.1/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

console.log(db.name);

const Post = require("./post");

const post = new Post({
  message: "we iz so confused",
  user: new mongoose.Types.ObjectId(),
  createdAt: Date.now(),
});

post.save();

// console.log(mongoose);
