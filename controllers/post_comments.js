const PostComment = require("../models/post_comment");

const PostCommentsController = {
  Create: (req, res) => {
    const session = {
      post: req.body.post,
      message: req.body.message,
      user: req.session.user,
    };
    const postComment = new PostComment(session);

    postComment.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("#");
    });
  },
};

module.exports = PostCommentsController;
