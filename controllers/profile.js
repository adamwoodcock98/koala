// const User = require("../models/user");
const Post = require("../models/post");
const User = require("../models/user")

const ProfileController = {
  Index: (req, res) => {
    const userObject = req.session.user;
    const usersFriends = [];

    userObject.friends.forEach(friend => {
      User.find({ _id: friend }).then(user => {
        usersFriends.push(user[0]);
      });
    });

    Post.find({ user: userObject._id })
    .populate("user")
    .then((posts) => {
      console.log("CHECKING ADDITION OF USER: ", usersFriends);
      res.render("profile/index", { user: userObject, posts: posts, friends: usersFriends });
    });
  },
};

module.exports = ProfileController;
