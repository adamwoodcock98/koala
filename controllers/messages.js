const User = require("../models/user");
const Message = require("../models/messages");
const { formatDistanceToNowStrict } = require("date-fns");

const MessagesController = {
  Index: (req, res) => {
    const friends = req.session.user.friends;
    const findQuery = [];
    friends.forEach((id) => {
      const friend = { _id: id };
      findQuery.push(friend);
    });

    User.find({ $or: findQuery }).then((friends) => {
      res.render("messages/index", {
        session: req.session.user,
        friends: friends,
      });
    });
  },
  Show: (req, res) => {
    const friends = req.session.user.friends;
    const findQuery = [];
    friends.forEach((id) => {
      const friend = { _id: id };
      findQuery.push(friend);
    });

    User.find({ $or: findQuery }).then((friends) => {
      User.findById(req.params.id).then((user) => {
        Message.find({
          $or: [
            { users: [req.session.user._id, user._id] },
            { users: [user._id, req.session.user._id] },
          ],
        })
          .populate([
            { path: "sender", model: "User" },
            { path: "users", model: "User" },
          ])
          .sort({ updatedAt: -1 })
          .limit(20)
          .then((messages) => {
            messages.forEach((message) => {
              const datePosted = formatDistanceToNowStrict(
                new Date(message.createdAt),
                { addSuffix: true }
              );
              message.datePosted = datePosted;
            });
            res.render("messages/show", {
              messages: messages,
              user: user,
              session: req.session.user,
              friends: friends,
            });
          });
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
