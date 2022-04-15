const User = require("../models/user");
const Post = require("../models/post");

const ProfileController = {
  Index: (req, res) => {
    const userObject = req.session.user;
    console.log(`THIS THE USERS ID: ${userObject._id}`);

    Post.find({ user: userObject._id }).then((posts) => {
      res.render("profile/index", { user: userObject, posts: posts });
    });
  },
};

module.exports = ProfileController;
