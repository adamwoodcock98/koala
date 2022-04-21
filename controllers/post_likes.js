const PostLike = require("../models/post_like");

const PostLikesController = {
  Create: (req, res) => {
    const session = {
      post: req.body.postId,
      user: req.session.user._id,
    };
    console.log("likesSession", session);
    const postLike = new PostLike(session);
    const postLikeId = postLike._id;

    console.log("postLikeId", postLikeId);

    postLike.save((err) => {
      if (err) {
        throw err;
      }
      res.redirect(307, `/posts/${session.post}/likes/${postLikeId}`);
    });
  },
  // Add a remove/delete method
};

module.exports = PostLikesController;
