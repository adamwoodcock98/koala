const mongoose = require("mongoose");

require("../mongodb_helper");
const PostComment = require("../../models/post_comment");

const mockPostId = new mongoose.Types.ObjectId();
const mockUserId = new mongoose.Types.ObjectId();

describe("Post comment model", () => {
  it("has a message, post, and a user", () => {
    const postComment = new PostComment({
      post: mockPostId,
      message: "some message",
      user: mockUserId,
    });
    expect(postComment.post).toEqual(mockPostId);
    expect(postComment.message).toEqual("some message");
    expect(postComment.user).toEqual(mockUserId);
  });

  it("requires a message", (done) => {
    const postComment = new PostComment({
      post: mockPostId,
      // message: "some message",
      user: mockUserId,
    });
    postComment.save((err) => {
      const actualError = err.errors.message.properties.message;
      expect(actualError).toEqual("Path `message` is required.");
      done();
    });
  });

  it("requires a link to a post", (done) => {
    const postComment = new PostComment({
      // post: mockPostId,
      message: "some message",
      user: mockUserId,
    });
    postComment.save((err) => {
      const actualError = err.errors.post.properties.message;
      expect(actualError).toEqual("Path `post` is required.");
      done();
    });
  });

  it("requires a user", (done) => {
    const postComment = new PostComment({
      post: mockPostId,
      message: "some message",
      // user: mockUserId,
    });
    postComment.save((err) => {
      const actualError = err.errors.user.properties.message;
      expect(actualError).toEqual("Path `user` is required.");
      done();
    });
  });
});
