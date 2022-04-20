const Post = require("../models/post");
const NewsAPI = require("../models/news_api");
// const api = new NewsAPI;

const PostsController = {
  Index: (req, res) => {  
    Post.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        req.session; // This line appears to be needed for later access to session properties
        const session = {
          posts: posts,
          user: req.session.user,
        };

        res.render("posts/index", { session: session, stories: null });

        
        // try {
        //   api.getNewsInfo(("q=recycling&"), data => {
        //     console.log(data)
        //     res.render("posts/index", { session: session, stories: data.response.results});
        //   })
        // } catch (err) {
        //   console.log(err);
        //   res.render("posts/index", { session: session, stories: null });
        // }
        
      });
  },

  Create: (req, res) => {
    const session = {
      message: req.body.message,
      user: req.session.user,
      createdAt: Date.now(),
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
