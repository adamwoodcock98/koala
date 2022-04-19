const mongoose = require("mongoose");

require("../mongodb_helper");
const PostComment = require("../../models/post_comment");

const mockPostId = new mongoose.Types.ObjectId();
const mockUserId = new mongoose.Types.ObjectId();

describe("Post comment model", () => {
  it("has a message", () => {
    const postComment = new PostComment({ message: "some message" });
    expect(postComment.message).toEqual("some message");
  });

  it("has a required message", (done) => {
    const postComment = new PostComment({ user: mockUserId });
    postComment.save((err) => {
      expect(err).not.toBeNull();
      done();
    });
  });

  it("has a user ID", () => {
    const postComment = new PostComment({
      message: "has a user ID",
      user: mockUserId,
    });
    expect(postComment.user).toEqual(mockUserId);
  });

  it("has a post ID", () => {
    const postComment = new PostComment({
      post: mockPostId,
      message: "has a user ID",
      user: mockUserId,
    });
    expect(postComment.post).toEqual(mockPostId);
  });
});
