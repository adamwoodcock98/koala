// const User = require("../models/user");
const Post = require("../models/post");
const User = require("../models/user");
require("../models/about_me");

const ProfileController = {
  Index: (req, res) => {
    const userID = req.params.userID

    User.findById(userID)
      .populate("aboutMe")
      .populate("friends")
      .then(user => {
        Post.find({ user: user._id }, (err, posts) => {
          if (err) {
            console.log(err);
          }
          user.posts = posts;
          res.render("profile/index", { user });
        });
      });
  },
};

module.exports = ProfileController;
