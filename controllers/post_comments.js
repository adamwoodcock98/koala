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
    console.log("We are updating a comment with a like!!!!!!!!");
    const commentId = req.params.commentId;
    const commentLikeId = req.params.commentLikeId;

    PostComment.findById(commentId).exec((err, post) => {
      if (err) {
        throw err;
      }
      post.likes.push(commentLikeId);

      post.save((err) => {
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
