const mongoose = require("mongoose");

require("../mongodb_helper");
const Post = require("../../models/post");

const mockUserId = new mongoose.Types.ObjectId();

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a required message", (done) => {
    const post = new Post({ user: mockUserId });
    post.save((err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  it("has a user ID", () => {
    const post = new Post({ message: "has a user ID", user: mockUserId });
    expect(post.user).toEqual(mockUserId);
  });

  it("has a required user ID", (done) => {
    const post = new Post({ message: "has a required ID" });
    post.save((err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  it("has a createdAt time", () => {
    const post = new Post({
      message: "has a user ID",
      user: mockUserId,
    });
    expect(post.createdAt).not.toBeNull();
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const post = new Post({ message: "can save a post", user: mockUserId });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "can save a post" });
        done();
      });
    });
  });
});
