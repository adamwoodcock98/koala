const Post = require("../models/post");
const { formatDistanceToNowStrict } = require("date-fns");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user")
      .populate({
        path: "likes",
        populate: { path: "user" },
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "likes",
          populate: { path: "commentlike" },
        },
      })
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        req.session; // This line appears to be needed for later access to session properties

        posts.forEach((post) => {
          post.createdAtFormatted = formatDistanceToNowStrict(
            new Date(post.createdAt),
            { addSuffix: true }
          );
          const likers = post.likes.map((like) => {
            return like.user._id;
          });
          post.userLiked = likers.includes(req.session.user._id);
          post.comments.forEach((comment) => {
            comment.createdAtFormatted = formatDistanceToNowStrict(
              new Date(comment.createdAt),
              { addSuffix: true }
            );
            const commentLikers = comment.likes.map((like) => {
              return like.user;
            });
            comment.userLikedComment = commentLikers.includes(
              req.session.user._id
            );
          });
        });

        const handlebarsObject = {
          sessionUser: req.session.user,
          data: {
            posts: posts,
          },
        };

        res.render("posts/index", handlebarsObject);
      });
  },

  Create: (req, res) => {
    const mongooseObject = {
      message: req.body.message,
      user: req.session.user,
      image: req.body.image,
    };
    const post = new Post(mongooseObject);

    if (req.body.message) {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    } else {
      res.status(201).redirect("/posts");
    }
  },

  AddComment: (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    Post.findById(postId).exec((err, post) => {
      if (err) {
        throw err;
      }
      post.comments.push(commentId);

      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(204).redirect("/posts");
      });
    });
  },

  AddLike: (req, res) => {
    const postId = req.params.postId;
    const likeId = req.params.likeId;

    Post.findById(postId).exec((err, post) => {
      if (err) {
        throw err;
      }
      post.likes.push(likeId);

      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(204).redirect("/posts");
      });
    });
  },

  RemoveLike: (req, res) => {
    const postId = req.params.postId;
    const likeId = req.params.likeId;

    Post.findById(postId).exec((err, post) => {
      if (err) {
        throw err;
      }
      const likeIndex = post.likes.indexOf(likeId);
      post.likes.splice(likeIndex, 1);

      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(204).redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
