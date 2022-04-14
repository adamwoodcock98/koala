const mongoose = require("mongoose");

// console.log(mongoose);

mongoose.connect("mongodb://127.0.0.1/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// The line that creates the database if it is not there
// const db = mongoose.connection;

// console.log(db.name);

const Post = require("./post");

const mockUserId = new mongoose.Types.ObjectId();
const posts = [];

for (let i = 0; i < 3; i++) {
  posts.push(new Post({ message: `This is post ${i}`, user: mockUserId }));
}

posts.forEach((post) => {
  post.save();
});

// const mongoose = require("mongoose");

// require("../mongodb_helper");
// const Post = require("../../models/post");

// describe("Post model", () => {
//   beforeEach((done) => {
//     mongoose.connection.collections.posts.drop(() => {
//       done();
//     });
//   });

//   it("has a message", () => {
//     const post = new Post({ message: "some message" });
//     expect(post.message).toEqual("some message");
//   });

//   it("has a required message", (done) => {
//     const post = new Post({ user: mockUserId });
//     post.save((err) => {
//       expect(err).not.toBeNull();
//       done();
//     })
//   });

//   it("has a user ID", () => {
//     const post = new Post({ message: "has a user ID", user: mockUserId });
//     expect(post.user).toEqual(mockUserId);
//   });

//   it("has a required user ID", (done) => {
//     const post = new Post({ message: "has a required ID" });
//     post.save((err) => {
//       expect(err).not.toBeNull();
//       done();
//     });
//   });

//   it("can list all posts", (done) => {
//     Post.find((err, posts) => {
//       expect(err).toBeNull();
//       expect(posts).toEqual([]);
//       done();
//     });
//   });
