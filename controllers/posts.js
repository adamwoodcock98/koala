const Post = require("../models/post");

const PostsController = {
  // TODO: fix session timestamp issue

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    }).sort( { createdAt: -1 } );
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
