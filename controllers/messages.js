const User = require("../models/user");
const Message = require("../models/messages");
const { formatDistanceToNowStrict } = require("date-fns");

const MessagesController = {
  Index: (req, res) => {
    User.findById(req.session.user._id).then((user) => {
      const friends = user.friends;
      const findQuery = [];
      friends.forEach((id) => {
        const friend = { _id: id };
        findQuery.push(friend);
      });

      const handlebarsObject = {
        sessionUser: req.session.user,
        data: {},
      };

      if (!findQuery.length) {
        res.render("messages/index", handlebarsObject);
      } else {
        User.find({ $or: findQuery }).then((friends) => {
          handlebarsObject.data.friends = friends;
          res.render("messages/index", handlebarsObject);
        });
      }
    });
  },
  Show: (req, res) => {
    const findQuery = [];
    let theUser;
    User.findById(req.session.user._id).then((user) => {
      theUser = user;
      console.log(user.friends);
      const friends = user.friends;
      friends.forEach((id) => {
        const friend = { _id: id };
        findQuery.push(friend);
      });
    });

    const messages = () => {
      User.find({ $or: findQuery }).then((friends) => {
        User.findById(req.params.id).then((user2) => {
          Message.find({
            $or: [
              { users: [theUser._id, user2._id] },
              { users: [user2._id, theUser._id] },
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
              const handlebarsObject = {
                sessionUser: req.session.user,
                data: {
                  messages: messages,
                  user: user2,
                  friends: friends,
                },
              };
              res.render("messages/show", handlebarsObject);
            });
        });
      });
    };

    setTimeout(messages, 200);
  },
  Create: (req, res) => {
    const message = new Message({
      message: { text: req.body.message },
      users: [req.session.user, req.params.id],
      sender: req.session.user,
    });

    if (req.body.message) {
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
    } else {
      res.status(201).redirect(`/message/${req.params.id}`);
    }
  },
};

module.exports = MessagesController;
