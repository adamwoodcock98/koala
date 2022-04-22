require("../models/notification");
const User = require("../models/user");
const { formatDistanceToNowStrict } = require('date-fns');

const NotificationsController = {
  Index: (req, res) => {
    User.findById(req.session.user._id)
      .populate({
        path: "notifications",
        options: { sort: "-createdAt" },
        populate: { path: "user" }
      })
      .then(user => {
        user.notifications.forEach(notification => {
          const createdAtFormatted = formatDistanceToNowStrict(new Date(notification.createdAt), { addSuffix: true })
          notification.createdAtFormatted = createdAtFormatted;
          notification.isFriendRequest = (notification.category === "Friend Request")
          notification.isComment = (notification.category === "Comment")
        })
        res.render("notifications/index", { notifications: user.notifications, friendConfirmation: req.flash("friendConfirmation"), user: req.session.user})
    })
  },
  Delete: (req, res) => {
    const notificationId = req.params.notificationId
    const user = req.session.user

    User.findById(user._id).then((user) => {
      user.notifications.pull(notificationId)
      user.save(() => {
        res.redirect("/notifications/")
      })
    })
  }
};

module.exports = NotificationsController;
