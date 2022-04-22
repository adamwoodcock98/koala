const PostComment = require("../models/post_comment");

const PostCommentsController = {
  Create: (req, res) => {
    const postId = req.body.postId;
    const mongooseObject = {
      post: postId,
      message: req.body.comment,
      user: req.session.user._id,
    };
    const postComment = new PostComment(mongooseObject);
    const postCommentId = postComment._id;

    postComment.save((err) => {
      if (err) {
        throw err;
      }
      res.redirect(307, `/posts/${postId}/comments/${postCommentId}`);
    });
  },
};

module.exports = PostCommentsController;
