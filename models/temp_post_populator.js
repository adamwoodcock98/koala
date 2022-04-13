const mongoose = require("mongoose");

// console.log(mongoose);

mongoose.connect("mongodb://127.0.0.1/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

console.log(db.name);

const Post = require("./post");

const post = new Post({ message: "the baddiez were here" });

post.save();

// console.log(mongoose);
