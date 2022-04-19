const User = require("../models/user");
const Message = require("../models/messages");

const MessagesController = {
  Index: (req, res) => {
    const friends = req.session.user.friends;
    const findQuery = [];
    console.log(friends);
    friends.forEach((id) => {
      const friend = { _id: id };
      findQuery.push(friend);
    });

    User.find({ $or: findQuery }).then((friends) => {
      res.render("messages/index", { friends: friends });
    });
  },
  Show: (req, res) => {
    User.findById(req.params.id).then((user) => {
      Message.find({ users: { $in: [req.session.user, user] } })
        .populate([
          { path: "sender", model: "User" },
          { path: "users", model: "User" },
        ])
        .sort({ updatedAt: -1 })
        .limit(20)
        .then((messages) => {
          res.render("messages/show", { messages: messages, user: user });
        });
    });
  },
  Create: (req, res) => {
    const message = new Message({
      message: { text: req.body.message },
      users: [req.session.user, req.params.id],
      sender: req.session.user,
    });

    message
      .populate([
        { path: "sender", model: "User" },
        { path: "users", model: "User" },
      ])
      .save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect(`/message/${req.params.id}`);
      });
  },
};

module.exports = MessagesController;
