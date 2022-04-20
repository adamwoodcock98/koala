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
          user.isProfileOwner = (userID === req.session.user._id);

          const friendIDArray = user.friends.map(user => {
            return user._id;
          })
          
          user.isFriends = friendIDArray.includes(req.session.user._id);
          
          res.render("profile/index", { user: user, loggedInUserId: req.session.user._id });
        });
      });
  },
};

module.exports = ProfileController;
