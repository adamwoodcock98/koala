const PostComment = require("../models/post_comment");

const PostCommentsController = {
  Create: (req, res) => {
    // console.log("===============================");
    // console.log("Request Headers", req.headers);
    // console.log("===============================");
    // console.log("Request Body", req.body);
    // console.log("===============================");
    // console.log("Request Session", req.session);
    // console.log("===============================");
    const session = {
      post: req.body.postId,
      message: req.body.comment,
      user: req.session.user._id,
    };
    const postComment = new PostComment(session);
    const postCommentId = postComment._id;

    console.log("postCommentId", postCommentId);

    postComment.save((err) => {
      if (err) {
        throw err;
      }
      console.log(
        "Redirecting to",
        `/posts/${session.post}/comments/${postCommentId}`
      );
      res.redirect(307, `/posts/${session.post}/comments/${postCommentId}`);
    });
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
        // /${session.post}/comments/${postCommentId}
      });
    });
  },

  RemoveLike: (req, res) => {
    console.log("We are deleting a like from a comment!!!!!!!");
    const commentId = req.params.commentId;
    const commentLikeId = req.params.commentLikeId;

    PostComment.findById(commentId).exec((err, comment) => {
      if (err) {
        throw err;
      }
      comment.likes.filter((like) => like != commentLikeId);

      comment.save((err) => {
        if (err) {
          throw err;
        }
        res.status(204).redirect(`/posts`);
        // /${session.post}/comments/${postCommentId}
      });
    });
  },
};

module.exports = PostCommentsController;
