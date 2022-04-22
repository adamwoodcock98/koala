const CommentLike = require("../models/comment_like");

const CommentLikesController = {
  Create: (req, res) => {
    const session = {
      comment: req.body.commentId,
      user: req.session.user._id,
    };
    const commentLike = new CommentLike(session);
    const commentLikeId = commentLike._id;
    const commentId = req.body.commentId;

    commentLike.save((err) => {
      if (err) {
        throw err;
      }
      res.redirect(
        307,
        `/comments/${commentId}/likes/${commentLikeId}`
      );
    });
  },
};

module.exports = CommentLikesController;
