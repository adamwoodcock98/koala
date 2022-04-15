const Post = require("../models/post");

const PostsController = {
  // TODO: fix session timestamp issue

  Index: (req, res) => {
    Post.find()
      .populate("user")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        req.session; // This line appears to be needed for later access to session properties
        const session = {
          posts: posts,
          user: req.session.user,
        };
        console.log("Session:", session);
        res.render("posts/index", session);
      });
  },

  Create: (req, res) => {
    const session = {
      message: req.body.message,
      user: req.session.user
    };
    const post = new Post(session);

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
