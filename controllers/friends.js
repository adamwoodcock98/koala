const User = require("../models/user");

const FriendsController = {
  Update: (req, res) => {
    const requesterUserID = req.session.user._id
    const receiverUserID = req.params.userID

    User.findOne({ _id: receiverUserID }).then((user) => {
      user.friends.push(requesterUserID);
      user.save(() => {
        User.findOne({ _id: requesterUserID}).then(user2 => {
          user2.friends.push(receiverUserID)
          user2.save(() => {
            res.redirect(`/profile/${receiverUserID}`);
          });
        })
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