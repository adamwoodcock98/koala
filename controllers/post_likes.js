const { rawListeners } = require("../models/post");
const Post = require("../models/post");
const PostLike = require("../models/post_like");
// const Post = require("../models/post_like")

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

  Delete: (req, res) => {
    // const session = {
    //   post: req.body.postId,
    //   user: req.session.user._id,
    // };
    // Find the like id via the user id and post id then delete it from post likes table
    PostLike.deleteOne({
      $and: [{ user: req.session.user._id }, { post: req.params.postId }],
    }).then(() => {
      PostLike.save((err) => {
        if (err) {
          throw err;
        }
        res.redirect(307, `/posts/`);
      });
    });

    // PostLike.findById(postLikeId).then(postLike => {
    //   postLike.
    // })

    // console.log("likesSession", session);
    // const postLike = new PostLike(session);
    // const postLikeId = postLike._id;

    // PostLike.save((err) => {
    //   if (err) {
    //     throw err;
    //   }
    //   res.redirect(307, `/posts/`);
    // });
  },
};

module.exports = PostLikesController;
