const User = require("../models/user");
// const Messages = require("../models/messages");

const MessagesController = {
  Index: (req, res) => {
    User.find(req.session.user._id).then((user) => {
      user.friends;
    });
  },
  // Create: (req, res) => {
  //   const session = {
  //     message: req.body.message,
  //     user: req.session.user,
  //   };
  //   const post = new Post(session);
  //   post.save((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.status(201).redirect("/posts");
  //   });
  // },
};

module.exports = MessagesController;
