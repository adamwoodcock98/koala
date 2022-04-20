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
      // console.log(
      //   "Redirecting to",
      //   `/posts/${session.post}/comments/${postCommentId}`
      // );
      res.redirect(307, `/posts/${session.post}/likes/${postLikeId}`);
    });
  },
};

module.exports = PostLikesController;
