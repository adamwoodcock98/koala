// const User = require("../models/user");
const Post = require("../models/post");
const User = require("../models/user");
const AboutMe = require("../models/about_me");

const ProfileController = {
  Index: (req, res) => {
    const userID = req.params.userID;
    const originalUrl = req.originalUrl;

    User.findById(userID)
      .populate("aboutMe")
      .populate("friends")
      .then((user) => {
        Post.find({ user: user._id }, (err, posts) => {
          if (err) {
            console.log(err);
          }
          user.posts = posts;
          user.isProfileOwner = userID === req.session.user._id;

          const friendIDArray = user.friends.map((user) => {
            return user._id;
          });

          if (originalUrl.includes(`${userID}/edit`)) {
            user.isEditingInfo = "";
          } else {
            user.isEditingInfo = "disabled";
          }

          if (originalUrl.includes("/user")) {
            user.isEditingProfile = ""
            user.shouldDisplayButtons = "";
          } else {
            user.isEditingProfile = "disabled"
            user.shouldDisplayButtons = "style='display:none;'";
          }

          user.isFriends = friendIDArray.includes(req.session.user._id);

          res.render("profile/index", {
            user: user,
            loggedInUserId: req.session.user._id,
          });
        });
      });
  },
  Update: (req, res) => {
    const data = req.body;

    AboutMe.findById(req.session.user.aboutMe).then((aboutMe) => {
      console.log("THIS IS ABOUT ME:", aboutMe);
      aboutMe.education = data.education;
      aboutMe.workplace = data.workplace;
      aboutMe.relationshipStatus = data.relationshipStatus;
      aboutMe.save().then(() => {
        res.redirect(`/profile/${req.session.user._id}`);
      });
    });
  },
  Change: (req, res) => {
    const splitName = req.body.profileName.split(" ")
    const firstName = splitName[0];
    const lastName = splitName[1];
    const pronouns = req.body.profilePronouns;

    User.findById(req.session.user._id).then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.pronouns = pronouns;
      user.save().then(() => {
        res.redirect(`/profile/${req.session.user._id}`);
      });
    });
  }
};

module.exports = ProfileController;
