const mongoose = require("mongoose");

// console.log(mongoose);

mongoose.connect("mongodb://127.0.0.1/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// console.log(mongoose);

const Post = require("./post");

const post = new Post({ message: "the baddiez were here" });
const post2 = new Post({ message: })

post.save();

// console.log(mongoose);
