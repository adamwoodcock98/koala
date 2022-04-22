const PostComment = require("../models/post_comment");

const PostCommentsController = {
  Create: (req, res) => {
    const postId = req.body.postId;
    const mongooseObject = {
      post: postId,
      message: req.body.comment,
      user: req.session.user._id,
    };

    const postCommentMessage = req.body.comment;

    if (postCommentMessage) {
      const postComment = new PostComment(mongooseObject);
      const postCommentId = postComment._id;

      postComment.save((err) => {
        if (err) {
          throw err;
        }
        res.redirect(
          307,
          `/posts/${mongooseObject.post}/comments/${postCommentId}`
        );
      });
    } else {
      res.redirect(300, `/posts/`);
    }
  },

  AddLike: (req, res) => {
    const commentId = req.params.commentId;
    const commentLikeId = req.params.commentLikeId;

    PostComment.findById(commentId).exec((err, comment) => {
      if (err) {
        throw err;
      }
      comment.likes.push(commentLikeId);

      comment.save((err) => {
        if (err) {
          throw err;
        }
        res.status(204).redirect(`/posts`);
      });
    });
  },

  RemoveLike: (req, res) => {
    const commentId = req.params.commentId;
    const commentLikeId = req.params.commentLikeId;

    PostComment.findById(commentId).exec((err, comment) => {
      if (err) {
        throw err;
      }
      const likeIndex = comment.likes.indexOf(commentLikeId);
      comment.likes.splice(likeIndex, 1);

      comment.save((err) => {
        if (err) {
          throw err;
        }
        res.status(204).redirect(`/posts`);
      });
    });
  },
};

module.exports = PostCommentsController;
