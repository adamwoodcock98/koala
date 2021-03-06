// const User = require("../models/user");
const Post = require("../models/post");
const User = require("../models/user");
const AboutMe = require("../models/about_me");
const { formatDistanceToNowStrict } = require("date-fns");

const ProfileController = {
  Index: (req, res) => {
    const userID = req.params.userID;
    const originalUrl = req.originalUrl;

    User.findById(userID)
      .populate("aboutMe")
      .populate("friends")
      .then((user) => {
        Post.find({ user: user._id })
        .populate("user")
        .populate({
          path: "comments",
          populate: { path: "user" },
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
            post.comments.forEach((comment) => {
              comment.createdAtFormatted = formatDistanceToNowStrict(
                new Date(comment.createdAt),
                { addSuffix: true }
              );
            });
          });

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

          const handlebarsObject = {
            sessionUser: req.session.user,
            data: {
              user: user,
            },
          };

          res.render("profile/index", handlebarsObject);

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
