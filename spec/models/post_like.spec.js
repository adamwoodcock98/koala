const mongoose = require("mongoose");

require("../mongodb_helper");
const PostLike = require("../../models/post_like");

const mockPostId = new mongoose.Types.ObjectId();
const mockUserId = new mongoose.Types.ObjectId();

describe("Post like model", () => {
  it("has a user ID", () => {
    const postLike = new PostLike({
      user: mockUserId,
    });
    expect(postLike.user).toEqual(mockUserId);
  });

  it("has a post ID", () => {
    const postLike = new PostLike({
      post: mockPostId,
      user: mockUserId,
    });
    expect(postLike.post).toEqual(mockPostId);
  });
});
