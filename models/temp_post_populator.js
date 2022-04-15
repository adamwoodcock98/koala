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
  message: "testing at 3.46 pm",
  user: new mongoose.Types.ObjectId(),
});

post.save();

// console.log(mongoose);
