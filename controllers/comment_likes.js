const CommentLike = require("../models/comment_like");

const CommentLikesController = {
  Create: (req, res) => {
    const session = {
      comment: req.body.commentId,
      user: req.session.user._id,
    };
    console.log("likesSession", session);
    const commentLike = new CommentLike(session);
    const commentLikeId = commentLike._id;
    const commentId = req.body.commentId;

    console.log("commentLikeId", commentLikeId);

    commentLike.save((err) => {
      if (err) {
        throw err;
      }
      console.log("<========== I am just about to redirect ==========>");
      res.redirect(
        307,
        `/comments/${commentId}/likes/${commentLikeId}`
        // ${session.post}/comments/${session.comment}
      );
    });
  },
};

module.exports = CommentLikesController;
