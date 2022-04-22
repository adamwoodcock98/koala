const User = require("../models/user");
const Notification = require("../models/notification");

const FriendsController = {
  Request: (req, res) => {
    const requesterUserID = req.session.user._id;
    const receiverUserID = req.params.userID;

    const notification = new Notification({category: "Friend Request", user: requesterUserID});
    notification.save(() => {
      User.findOne({ _id: receiverUserID }).then((user) => {
        user.notifications.push(notification);
        user.save(() => {
          res.redirect(`/profile/${receiverUserID}`);
          });
      });
    })
  },
  Confirm: (req, res) => {
    const requesterUserId = req.params.userId;
    const receiverUserId = req.session.user._id;
    const notificationId = req.params.notificationId

    User.findById(requesterUserId).then((user) => {
      user.friends.push(receiverUserId)
      user.save(() => {
        User.findById(receiverUserId).then((user2) => {
          user2.friends.push(requesterUserId)
          user2.save(() => {
            req.flash("friendConfirmation", `You are now friends with ${user.firstName} ${user.lastName}`)
            res.redirect(`/notifications/delete/${notificationId}`);
          });
        });
      });
    });
  },
  Delete: (req, res) => {
    const requesterUserID = req.session.user._id
    const receiverUserID = req.params.userID

    User.findById(receiverUserID)
    .then(user => {
      user.friends.pull(requesterUserID);
      user.save(() => {
        User.findById(requesterUserID)
          .then(user2 => {
            user2.friends.pull(receiverUserID);
            user2.save(() => {
              res.redirect(`/profile/${receiverUserID}`);
            })
          });
      })
      })
    }
};

module.exports = FriendsController;