// const User = require("../models/user");
const Post = require("../models/post");

const ProfileController = {
  Index: (req, res) => {
    const userObject = req.session.user;

    Post.find({ user: userObject._id })
    .populate("user")
    .then((posts) => {
      res.render("profile/index", { user: userObject, posts: posts });
    });
  },
};

module.exports = ProfileController;
